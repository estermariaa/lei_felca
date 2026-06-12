import os
import sys
import random
import numpy as np
import pandas as pd
import torch
from sklearn.cluster import KMeans
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import CountVectorizer
from bertopic import BERTopic  
from bertopic.vectorizers import ClassTfidfTransformer
from umap import UMAP
from tqdm.auto import tqdm

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 
os.environ["OPENBLAS_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["VECLIB_MAXIMUM_THREADS"] = "1"
os.environ["NUMEXPR_NUM_THREADS"] = "1"
os.environ["PYTHONHASHSEED"] = "42"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

SEED = 42
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)

print("Carregando os documentos originais...")
data_frame = pd.read_csv("df_clean_text.csv")

df = data_frame[data_frame['clean_text'].notna()].reset_index(drop=True)
df.drop_duplicates(subset=['clean_text'], inplace=True)
docs = df['clean_text'].tolist()
print(f"Total de documentos para análise final: {len(docs)}")

CUSTOM_STOPWORDS = [
    'falar', 'gente', 'querer', 'pessoa', 'ficar', 'outro', 'achar', 'video',
    'algum', 'hoje', 'acontecer', 'deixar', 'precisar', 'comecar', 'passar',
    'social', 'cara', 'rede', 'olhar', 'entender', 'dever', 'conteudo', 'felcar',
    'chegar', 'entrar', 'vida', 'colocar', 'acabar', 'conseguir', 'verdade',
    'criar', 'gostar', 'importante', 'existir', 'pensar', 'chamar', 'trazer',
    'certo', 'realmente', 'mostrar', 'parecer', 'conhecer', 'nenhum', 'sair',
    'pessoal', 'hora', 'tirar', 'mudar', 'claro', 'ninguem', 'canal', 'ganhar',
    'real', 'continuar', 'voltar', 'felca', 'nome', 'ajudar', 'levar', 'lembrar',
    'abrir', 'tomar', 'esperar', 'assunto', 'pedir', 'perder', 'funcionar',
    'receber', 'acreditar'
]

N_CLUSTERS = 50
N_NEIGHBORS = 20
MIN_DIST = 0.1

print("\nCarregando modelo de linguagem na CPU...")
embedding_model = SentenceTransformer("neuralmind/bert-base-portuguese-cased", device='cpu')

vectorizer = CountVectorizer(stop_words=CUSTOM_STOPWORDS, min_df=3, max_df=0.9)

lista_componentes = [5, 10]

for N_COMPONENTS in lista_componentes:
    NOME_MODELO = f"Modelo_50_topicos_comp{N_COMPONENTS}"
    
    print(f"\n{'='*80}")
    print(f" INICIANDO TREINAMENTO: {NOME_MODELO}")
    print(f"{'='*80}")
    
    print(f"[{NOME_MODELO}] Inicializando UMAP...")
    umap_model = UMAP(
        n_neighbors=N_NEIGHBORS, 
        n_components=N_COMPONENTS,
        min_dist=MIN_DIST,
        metric='cosine',
        random_state=SEED, 
        transform_seed=SEED,
        n_jobs=1 
    )

    print(f"[{NOME_MODELO}] Inicializando KMeans...")
    cluster_model = KMeans(n_clusters=N_CLUSTERS, random_state=SEED)

    print(f"[{NOME_MODELO}] Treinando BERTopic (Isso pode demorar um pouco na CPU)...")
    modelo = BERTopic(
        language='portuguese',
        top_n_words=15, 
        embedding_model=embedding_model,
        umap_model=umap_model,
        hdbscan_model=cluster_model,
        vectorizer_model=vectorizer,
        ctfidf_model=ClassTfidfTransformer(reduce_frequent_words=True, bm25_weighting=True)
    )

    topicos_previstos, probs = modelo.fit_transform(docs)

    dir_path = f"modelagens_finais_cpu2/{NOME_MODELO}"
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    modelo.save(os.path.join(dir_path, "bertopic_model"))
    modelo.get_topic_info().to_csv(os.path.join(dir_path, "topics_info.csv"), index=False)
    print(f"[{NOME_MODELO}] ✅ Modelo treinado e estrutura salva com sucesso!")

    df_modelo = df.copy() 
    df_modelo['Topico_Atribuido'] = topicos_previstos
    
    caminho_df_final = os.path.join(dir_path, "df_com_topicos.csv")
    df_modelo.to_csv(caminho_df_final, index=False, encoding='utf-8')
    print(f"[{NOME_MODELO}] ✅ Base de dados salva: {caminho_df_final}")

    ARQUIVO_SAIDA = f"relatorio_{NOME_MODELO}.txt"
    info_topicos = modelo.get_topic_info()
    topicos_validos = [t for t in info_topicos['Topic'].tolist() if t != -1]

    print(f"[{NOME_MODELO}] Gerando relatório TXT com {len(topicos_validos)} tópicos...")

    with open(ARQUIVO_SAIDA, "w", encoding="utf-8") as f:
        f.write(f"{'='*80}\n")
        f.write(f" RELATÓRIO QUALITATIVO DA MODELAGEM: {NOME_MODELO}\n")
        f.write(f" Total de Tópicos Encontrados: {len(topicos_validos)}\n")
        f.write(f"{'='*80}\n\n")

        for topico in tqdm(topicos_validos, desc="Escrevendo TXT"):
            palavras_com_pesos = modelo.get_topic(topico)
            top_10_palavras = [palavra for palavra, peso in palavras_com_pesos][:10]
            docs_representativos = modelo.get_representative_docs(topico)

            docs_do_topico = [doc for doc, t in zip(docs, topicos_previstos) if t == topico]
            docs_disponiveis = [doc for doc in docs_do_topico if doc not in docs_representativos]

            qtd_sorteio = min(7, len(docs_disponiveis))
            docs_aleatorios = random.sample(docs_disponiveis, qtd_sorteio)

            f.write(f"{'='*80}\n")
            f.write(f" TÓPICO {topico}\n")
            f.write(f"{'='*80}\n")

            f.write(f"\n🔹 TOP 10 PALAVRAS-CHAVE:\n")
            f.write(" • " + ", ".join(top_10_palavras) + "\n\n")

            f.write(f"🔹 OS 3 DOCUMENTOS MAIS REPRESENTATIVOS (Centro do Cluster):\n")
            for i, doc in enumerate(docs_representativos, start=1):
                f.write(f"  {i}. {doc}\n\n")

            if qtd_sorteio > 0:
                f.write(f"🔹 {qtd_sorteio} DOCUMENTOS ALEATÓRIOS DO MESMO TÓPICO:\n")
                for i, doc in enumerate(docs_aleatorios, start=1):
                    f.write(f"  {i}. {doc}\n\n")

            f.write("\n\n") 

    print(f"[{NOME_MODELO}] ✅ VITÓRIA! Relatório salvo como '{ARQUIVO_SAIDA}'.\n")

print(f"\n{'='*80}")
print("🎉 TODAS AS MODELAGENS FINALIZADAS COM SUCESSO! 🎉")
print(f"{'='*80}")