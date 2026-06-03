from meu_bertopic import BERTopic
import pandas as pd
from sentence_transformers import SentenceTransformer
from umap import UMAP
from hdbscan import HDBSCAN
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from bertopic.vectorizers import ClassTfidfTransformer
from bertopic.representation import KeyBERTInspired
from bertopic.representation import PartOfSpeech
from bertopic.representation import MaximalMarginalRelevance
from sklearn.feature_extraction.text import TfidfVectorizer
import os

def run_topic_modeling():

    local_cache_dir = os.path.join(os.getcwd(), '.hf_cache')
    os.makedirs(local_cache_dir, exist_ok=True)
    os.environ['HF_HOME'] = local_cache_dir
    os.environ['HUGGINGFACE_HUB_CACHE'] = local_cache_dir
    os.environ['TRANSFORMERS_CACHE'] = local_cache_dir

    print("Carregando modelo de embeddings local...")
    embedding_model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

    save_data = 'data_topic_modeling'

    df = pd.read_csv('../data/df_clean_text.csv') # carrega as transcrições já pré-processadas
    
    use_df = df[df['clean_text'].notna()] # elimina as tuplas que forem nulas nesta coluna
    use_df = use_df.reset_index(drop=True)

    main_representation = KeyBERTInspired() #extrai as palavras chaves principais

    # Additional ways of representing a topic
    aspect_model1 = PartOfSpeech("pt_core_news_sm") #extrai apenas classes gramaticas específicas(como substantivos e adjetivos)
    aspect_model2 = [KeyBERTInspired(top_n_words=10), MaximalMarginalRelevance(diversity=.3)] #gera uma lista das palavras-chaves mais diversificada, evitando termos semelhantes
    
    caminho_stopwords = 'stopwords.txt' # Ajuste o caminho se necessário
    try:
        with open(caminho_stopwords, 'r', encoding='utf-8') as f:
            minhas_stopwords = [linha.strip() for linha in f.readlines() if linha.strip()]
        print(f"{len(minhas_stopwords)} stopwords carregadas do arquivo.")
    except FileNotFoundError:
        print("Arquivo de stopwords não encontrado. Usando lista vazia.")
        minhas_stopwords = []

    vectorizer = CountVectorizer(stop_words=minhas_stopwords)

    #vectorizer = TfidfVectorizer(stop_words=minhas_stopwords)
    num = 5 
    params = {
        #'nr_topics': num, # número de tópicos
        'language': 'portuguese', 
        'calculate_probabilities': True, # % de um doc em tópicos
        'verbose': False, # explicação detalhada do processo
        'top_n_words': 10, # quantas palavras em cada tópico
        'embedding_model': embedding_model,
        'umap_model': UMAP(n_neighbors=10, 
                  n_components=5, 
                  metric='cosine', 
                  random_state=42),
        'hdbscan_model': HDBSCAN(
            min_cluster_size=50,
            #allow_single_cluster=True,
            min_samples=5,
            #cluster_selection_method='leaf',
            #alpha=1,
            #cluster_selection_method='eom',
            prediction_data=True
        ),
        'vectorizer_model' : vectorizer,# usa o kmeans como algoritmo de clusterização, fixando o número de tópicos em 10
        'ctfidf_model' : ClassTfidfTransformer(reduce_frequent_words=True)
        }
    
    model = BERTopic(**params) # modelo com os parâmetros definidos

    print(params)
    #print(minhas_stopwords)

    topics, probs = model.fit_transform(use_df['clean_text']) # o modelo é treinado com os textos da coluna clean_text

    #model.save(f"./topicmodeling/{save_data}/kmeans_1", serialization="pickle") # o objeto do modelo treinado é salvo como pickle
    return model, probs, topics