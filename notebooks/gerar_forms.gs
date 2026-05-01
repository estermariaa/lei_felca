function criarMultiplosFormularios() {
  // Lista com os títulos e IDs dos vídeos do YouTube
  const listaVideos = [
  ];

  listaVideos.forEach(item => {
    // Cria o formulário com o nome específico
    const form = FormApp.create('Pesquisa: ' + item.titulo);
    
    form.addPageBreakItem().setTitle(item.titulo);
    form.addVideoItem()
        .setVideoUrl("https://www.youtube.com/watch?v=" + item.videoId)
        .setHelpText("Assista ao vídeo antes de responder.");

    form.addMultipleChoiceItem()
        .setTitle("O que você achou do conteúdo?")
        .setChoiceValues(["Excelente", "Bom", "Regular", "Ruim"])
        .setRequired(true);

    console.log('Formulário criado: ' + form.getEditUrl());
  });
}

function criarFormulariosAvaliacao() {
  const idPastaImagens = '1vu8gtEl0dmu-COjBDfsWvv7JsVSH4Pvi'; 
  
  const pastaImagens = DriveApp.getFolderById(idPastaImagens);

  const textoBruto = `
Formulário 1
https://www.youtube.com/watch?v=9EUEoBBKsDw
https://www.youtube.com/watch?v=UYzkLh7ogbg
https://www.youtube.com/watch?v=BZr_tywUSEA
https://www.youtube.com/watch?v=uoQ7FF2cmYo
https://www.youtube.com/watch?v=lw5GHQ7n06U
https://www.youtube.com/watch?v=dE2W3E6vuEY
https://www.youtube.com/watch?v=35NMXfx-j08
https://www.youtube.com/watch?v=SXYRkjxVcPU
https://www.youtube.com/watch?v=dVC9Lt8AkZU
https://www.youtube.com/watch?v=ShVmMUPaBo8
Formulário 2
https://www.youtube.com/watch?v=1jzcNWLaZZ4
https://www.youtube.com/watch?v=DB1qZ9LTtac
https://www.youtube.com/watch?v=f7U-ZQ4dRRA
https://www.youtube.com/watch?v=K_pIJh3-cR4
https://www.youtube.com/watch?v=Sri-a3m5GRo
https://www.youtube.com/watch?v=A6LE8YrwaAw
https://www.youtube.com/watch?v=7U1B5obs0iY
https://www.youtube.com/watch?v=DkxamO1daSE
https://www.youtube.com/watch?v=B5qYxZrMeC0
https://www.youtube.com/watch?v=vRLvD8TbR4M
Formulário 3
https://www.youtube.com/watch?v=4v2xgIkhBQM
https://www.youtube.com/watch?v=AwTPrxLK4yk
https://www.youtube.com/watch?v=dSD1Ko32G3U
https://www.youtube.com/watch?v=2tqXuAADf9I
https://www.youtube.com/watch?v=K43_CEwVGtY
https://www.youtube.com/watch?v=gemYZ8FCYJY
https://www.youtube.com/watch?v=ldI-aY3Abps
https://www.youtube.com/watch?v=yfd0OWKFtQE
https://www.youtube.com/watch?v=n7ct0UdtTlM
https://www.youtube.com/watch?v=f8vYHqyCyfQ
Formulário 4
https://www.youtube.com/watch?v=mHsrq_wDOGA
https://www.youtube.com/watch?v=ooNIvbOc9Hc
https://www.youtube.com/watch?v=ZR2t0iPGcXI
https://www.youtube.com/watch?v=rRpueJUPU8g
https://www.youtube.com/watch?v=KRVqQRypVns
https://www.youtube.com/watch?v=Qc3Gam07mOI
https://www.youtube.com/watch?v=ufgfwsHvLKo
https://www.youtube.com/watch?v=F7FqSEm_9aY
https://www.youtube.com/watch?v=rS5NGt063ec
https://www.youtube.com/watch?v=6vfGMn49Z90
Formulário 5
https://www.youtube.com/watch?v=CWZ_dp-sCR8
https://www.youtube.com/watch?v=jbVskortbac
https://www.youtube.com/watch?v=qpyLckxirXM
https://www.youtube.com/watch?v=5xqek2eF5xM
https://www.youtube.com/watch?v=jJjkH_69P88
https://www.youtube.com/watch?v=OQUsxgMpvao
https://www.youtube.com/watch?v=nmKIIPTWfok
https://www.youtube.com/watch?v=GeEs0cYuBr0
https://www.youtube.com/watch?v=N6YkVJ4uCM8
https://www.youtube.com/watch?v=LxRjiKFHSl8
Formulário 6
https://www.youtube.com/watch?v=ppJilVVgijU
https://www.youtube.com/watch?v=vsJs7v8KZJM
https://www.youtube.com/watch?v=2WUN0CScV4s
https://www.youtube.com/watch?v=GT0nyH7b4AQ
https://www.youtube.com/watch?v=WdE-vi0NoN0
https://www.youtube.com/watch?v=HoZaufUaKxc
https://www.youtube.com/watch?v=rCQ52_ehuW4
https://www.youtube.com/watch?v=YoCm8ZIKKY0
https://www.youtube.com/watch?v=LIQ2cED5J8s
https://www.youtube.com/watch?v=QinBWzZ3txo
Formulário 7
https://www.youtube.com/watch?v=5XawsvhugC8
https://www.youtube.com/watch?v=vCNaHI81dVA
https://www.youtube.com/watch?v=4_WE4TsU1ys
https://www.youtube.com/watch?v=dEnGq2aGURM
https://www.youtube.com/watch?v=iyP-ZuoEkqE
https://www.youtube.com/watch?v=4McSTEYaK5I
https://www.youtube.com/watch?v=Y9v8RiywK6Q
https://www.youtube.com/watch?v=rbptGCEsaaI
https://www.youtube.com/watch?v=mdQrx6xt8ps
https://www.youtube.com/watch?v=GOFl4lQyryQ
Formulário 8
https://www.youtube.com/watch?v=Y2cToLuJV_g
https://www.youtube.com/watch?v=_VyII-BeaqI
https://www.youtube.com/watch?v=b30BhV93-cA
https://www.youtube.com/watch?v=ch5Af1389ic
https://www.youtube.com/watch?v=1Ytgn6D0d8Q
https://www.youtube.com/watch?v=eO8HuolF_3U
https://www.youtube.com/watch?v=syfL6K2ydIE
https://www.youtube.com/watch?v=xtwjhqjZhpU
https://www.youtube.com/watch?v=uo7CfpH4YhQ
https://www.youtube.com/watch?v=rwqcBgFlv9w
Formulário 9
https://www.youtube.com/watch?v=RR08_9smajs
https://www.youtube.com/watch?v=rlM7Nf61fw8
https://www.youtube.com/watch?v=rBloiFKZJTk
https://www.youtube.com/watch?v=3DaG4vJYW7c
https://www.youtube.com/watch?v=F3MdUhut0Og
https://www.youtube.com/watch?v=C17a8qQfBig
https://www.youtube.com/watch?v=yrnja6_G0Z0
https://www.youtube.com/watch?v=fzDxrK6CVYE
https://www.youtube.com/watch?v=DwRIfRzHHcE
https://www.youtube.com/watch?v=H4FFqyX9t1o
Formulário 10
https://www.youtube.com/watch?v=NTGin0rn-bY
https://www.youtube.com/watch?v=u_DZnR-epf0
https://www.youtube.com/watch?v=Aj_tZykDbPE
https://www.youtube.com/watch?v=ygKx4AquB4U
https://www.youtube.com/watch?v=cCD1O5XSzVw
https://www.youtube.com/watch?v=HFOA6sU8yvk
https://www.youtube.com/watch?v=_-ZXvDmztnQ
https://www.youtube.com/watch?v=5jcZM4A_Ao0
https://www.youtube.com/watch?v=YWiKTEiwHFY
https://www.youtube.com/watch?v=TSHQT5MtGcw
Formulário 11
https://www.youtube.com/watch?v=c_1-40YwOC8
https://www.youtube.com/watch?v=Ds6FyUFToag
https://www.youtube.com/watch?v=vTCGIGlgCMs
https://www.youtube.com/watch?v=r9uUJfXjBnM
https://www.youtube.com/watch?v=1s72KZaN92M
https://www.youtube.com/watch?v=gS9ElLHN-uY
https://www.youtube.com/watch?v=8R3UHC4LbRo
https://www.youtube.com/watch?v=OYJwandgPOk
https://www.youtube.com/watch?v=yXNg2fS1dts
https://www.youtube.com/watch?v=SuxR0bsiLs8
Formulário 12
https://www.youtube.com/watch?v=30hJ4l9JpRg
https://www.youtube.com/watch?v=ypLsrTnpnFA
https://www.youtube.com/watch?v=eo3ixN_dvcw
https://www.youtube.com/watch?v=v7isextvHcE
https://www.youtube.com/watch?v=Y6dfUgydYTM
https://www.youtube.com/watch?v=Fk-JKgxBGUE
https://www.youtube.com/watch?v=heo3OeJUzUA
https://www.youtube.com/watch?v=fYDXLCQ7kgM
https://www.youtube.com/watch?v=KNjnTiUoIG4
https://www.youtube.com/watch?v=gV1SuOHxd9U
Formulário 13
https://www.youtube.com/watch?v=DTXKLQ-dqso
https://www.youtube.com/watch?v=gjeUMCj7jFs
https://www.youtube.com/watch?v=REhRsitMa7E
https://www.youtube.com/watch?v=AZVvdNJqe5o
https://www.youtube.com/watch?v=_9EBME35xsA
https://www.youtube.com/watch?v=V1BhQ7RiNr0
https://www.youtube.com/watch?v=MDog6UkjzFU
https://www.youtube.com/watch?v=dk9rclPW-oo
https://www.youtube.com/watch?v=AIJ3q4Kz61g
https://www.youtube.com/watch?v=zkPAuVwFpeA
Formulário 14
https://www.youtube.com/watch?v=pwgPvk9IEAs
https://www.youtube.com/watch?v=6xxi70O9EpI
https://www.youtube.com/watch?v=_ZcDarL11kU
https://www.youtube.com/watch?v=2cU8gtVX7U4
https://www.youtube.com/watch?v=ZtVw1-I4iVI
https://www.youtube.com/watch?v=9V2lVAOiLXs
https://www.youtube.com/watch?v=mGYspANmnCw
https://www.youtube.com/watch?v=duW8euurJxk
https://www.youtube.com/watch?v=Ow2lIS9wQQg
https://www.youtube.com/watch?v=W2ouLkM9NJ4
Formulário 15
https://www.youtube.com/watch?v=7u2ii0LhO2Q
https://www.youtube.com/watch?v=Rd7Jyrvz5zs
https://www.youtube.com/watch?v=g3wvdYEGc3s
https://www.youtube.com/watch?v=59OuLcAKTfs
https://www.youtube.com/watch?v=AIEihV-eiCA
https://www.youtube.com/watch?v=mSFiN-p2eCQ
https://www.youtube.com/watch?v=sNKNUVmEdhY
https://www.youtube.com/watch?v=4Jfy5uDQyQg
https://www.youtube.com/watch?v=Oco1gvF7jEY
https://www.youtube.com/watch?v=wETM53INk6E
Formulário 16
https://www.youtube.com/watch?v=rV5CBbtIjJI
https://www.youtube.com/watch?v=XnCmonD4Ye8
https://www.youtube.com/watch?v=LpYxJwDBkOQ
https://www.youtube.com/watch?v=kLgoxukK-mY
https://www.youtube.com/watch?v=uUO1zVC5cgE
https://www.youtube.com/watch?v=4TxzrpC7Q2k
https://www.youtube.com/watch?v=22lWtHbpTkU
https://www.youtube.com/watch?v=w_lmVpbLLCc
https://www.youtube.com/watch?v=CrrC6hoJcSo
https://www.youtube.com/watch?v=xFHQyOw0J7c
Formulário 17
https://www.youtube.com/watch?v=B8-r1WibpSY
https://www.youtube.com/watch?v=wYAbhOnX_KA
https://www.youtube.com/watch?v=8mwykk_XYJg
https://www.youtube.com/watch?v=gxY-U6eq11I
https://www.youtube.com/watch?v=JWDVprVIJSc
https://www.youtube.com/watch?v=Ond73JU7-W8
https://www.youtube.com/watch?v=TfobYyj8450
https://www.youtube.com/watch?v=nsnJ84-PTRw
https://www.youtube.com/watch?v=Js0idJtFDqw
https://www.youtube.com/watch?v=OkuGLUkSsjk
Formulário 18
https://www.youtube.com/watch?v=edx4GT7srfk
https://www.youtube.com/watch?v=SOkcI1hADg0
https://www.youtube.com/watch?v=L0KcOFPcBl8
https://www.youtube.com/watch?v=oDDk-8FHwnk
https://www.youtube.com/watch?v=3AdcEOx2pwM
https://www.youtube.com/watch?v=LTD6nuwX-V0
https://www.youtube.com/watch?v=rEbVV_tRFG0
https://www.youtube.com/watch?v=xcSnfP5Cu58
https://www.youtube.com/watch?v=Vfsy2eFM24s
https://www.youtube.com/watch?v=CiYhsXf8Hec
Formulário 19
https://www.youtube.com/watch?v=UtsEJJLrqUA
https://www.youtube.com/watch?v=YavSVvRpzAc
https://www.youtube.com/watch?v=Y_Jhfzoz-xE
https://www.youtube.com/watch?v=bJkJbv5uknY
https://www.youtube.com/watch?v=OQQx_jcnLuk
https://www.youtube.com/watch?v=VoyUZjYWuHY
https://www.youtube.com/watch?v=ZYcJZJ5xzOk
https://www.youtube.com/watch?v=o3ZBJsShDlw
https://www.youtube.com/watch?v=oL6y3bIJIyQ
https://www.youtube.com/watch?v=ZL-7gKzZLKM
Formulário 20
https://www.youtube.com/watch?v=DAUmkBezS6A
https://www.youtube.com/watch?v=PeaW8eX-n78
https://www.youtube.com/watch?v=21_c_cHBA28
https://www.youtube.com/watch?v=IneIRLZE3Tk
https://www.youtube.com/watch?v=0kKGkXgTxk0
https://www.youtube.com/watch?v=UlhVg2avOXM
https://www.youtube.com/watch?v=bZqwKHyXXzI
https://www.youtube.com/watch?v=_IdPS2l8QRE
https://www.youtube.com/watch?v=t6fOqAuNMKY
https://www.youtube.com/watch?v=rsejCxNfPIs
Formulário 21
https://www.youtube.com/watch?v=K5S67DDNpTM
https://www.youtube.com/watch?v=GO0ziRWD0wU
https://www.youtube.com/watch?v=D-ogvSZRwUE
https://www.youtube.com/watch?v=ft3rf3820LU
https://www.youtube.com/watch?v=pijDm04XIXE
https://www.youtube.com/watch?v=a-fIf08RAEs
https://www.youtube.com/watch?v=qRhR2VJi00o
https://www.youtube.com/watch?v=8WcGxQKgkE4
https://www.youtube.com/watch?v=bE9VFn64KX8
https://www.youtube.com/watch?v=bI4Po0qF2yc
Formulário 22
https://www.youtube.com/watch?v=VGwlXDfESdw
https://www.youtube.com/watch?v=c4LqNNgXp1s
https://www.youtube.com/watch?v=27TMnxN4FAQ
https://www.youtube.com/watch?v=OIIhoCJswPE
https://www.youtube.com/watch?v=I89PVpAMrUI
https://www.youtube.com/watch?v=fXGVj4EoB9A
https://www.youtube.com/watch?v=YMUKsmIgzKw
https://www.youtube.com/watch?v=CKlHsYQ81WU
https://www.youtube.com/watch?v=uAwtn_yG0aY
https://www.youtube.com/watch?v=ZT9heVNg_2s
Formulário 23
https://www.youtube.com/watch?v=p0er_U50nSI
https://www.youtube.com/watch?v=TubXYVS2MR8
https://www.youtube.com/watch?v=O0_NazLNBcs
https://www.youtube.com/watch?v=Oqy2qcA-TDc
https://www.youtube.com/watch?v=sqStiPkclM0
https://www.youtube.com/watch?v=_Na0ErA3bJM
https://www.youtube.com/watch?v=hUZs03_ZTBc
https://www.youtube.com/watch?v=g-dsRrbQBZ0
https://www.youtube.com/watch?v=t50j9cbeuew
https://www.youtube.com/watch?v=LrRn_1iLdAM
Formulário 24
https://www.youtube.com/watch?v=uhdRH169-1Y
https://www.youtube.com/watch?v=PnobetspWm8
https://www.youtube.com/watch?v=LPDJollYuAc
https://www.youtube.com/watch?v=3Llfu0gsBiM
https://www.youtube.com/watch?v=T9PfyS8pwZc
https://www.youtube.com/watch?v=gP3NtzfQMSE
https://www.youtube.com/watch?v=JXcWoRrSYbQ
https://www.youtube.com/watch?v=jG6b_cqJW-g
https://www.youtube.com/watch?v=0GD-VqLEzIg
https://www.youtube.com/watch?v=7vbZKg_s8oM
Formulário 25
https://www.youtube.com/watch?v=VgKuxiu8jok
https://www.youtube.com/watch?v=8b3ctmdSZf0
https://www.youtube.com/watch?v=iY3vHTVrFq4
https://www.youtube.com/watch?v=mx2ji6aqNu8
https://www.youtube.com/watch?v=2ffj4xLesGU
https://www.youtube.com/watch?v=wEgmFbuRxjo
https://www.youtube.com/watch?v=1kLGgjR0fPw
https://www.youtube.com/watch?v=NEgsXtsuImc
https://www.youtube.com/watch?v=D4X2y2yzVeg
https://www.youtube.com/watch?v=LmHPCc3EFOg
Formulário 26
https://www.youtube.com/watch?v=ltzRTHA34Ms
https://www.youtube.com/watch?v=_9PLQWVjpOg
https://www.youtube.com/watch?v=iZFKIU0H6NA
https://www.youtube.com/watch?v=fRkDwBFTxDg
https://www.youtube.com/watch?v=dc8T8L5hPWc
https://www.youtube.com/watch?v=BHUVd1k18Gs
https://www.youtube.com/watch?v=LQEr2A1VHgg
https://www.youtube.com/watch?v=Q7wPKBo8HB0
https://www.youtube.com/watch?v=QnMmUFPPjSM
https://www.youtube.com/watch?v=i0gBrNpJlCQ
Formulário 27
https://www.youtube.com/watch?v=eRjup53s73E
https://www.youtube.com/watch?v=MGefXuChRLk
https://www.youtube.com/watch?v=3vmHSYT9BpE
https://www.youtube.com/watch?v=lZB8ZjpliLQ
https://www.youtube.com/watch?v=2G9CmHhgIZE
https://www.youtube.com/watch?v=9cpSu84GDX0
https://www.youtube.com/watch?v=ljcL_pmPswI
https://www.youtube.com/watch?v=RaCf8r0WOOY
https://www.youtube.com/watch?v=CiobYZ2OnDY
https://www.youtube.com/watch?v=xoG_S3UxrV4
Formulário 28
https://www.youtube.com/watch?v=5T0NJcZoa_0
https://www.youtube.com/watch?v=GOZeoajJ8z0
https://www.youtube.com/watch?v=LJ8xrO3dKoM
https://www.youtube.com/watch?v=qynthHjVz_I
https://www.youtube.com/watch?v=PwQgTrKH--s
https://www.youtube.com/watch?v=tZtLY-78C2Y
https://www.youtube.com/watch?v=RLUPb8SHH7c
https://www.youtube.com/watch?v=zxrGgNHTeLI
https://www.youtube.com/watch?v=Ch8x2hL41Jk
https://www.youtube.com/watch?v=Sol5sfSB4-Y
Formulário 29
https://www.youtube.com/watch?v=PnlJPJhN1rY
https://www.youtube.com/watch?v=ux-34ZUgVlk
https://www.youtube.com/watch?v=dmqGApfzvQU
https://www.youtube.com/watch?v=v59VpMQ-tY0
https://www.youtube.com/watch?v=PeO-01gRTDI
https://www.youtube.com/watch?v=HXgD2_0-uSw
https://www.youtube.com/watch?v=cJFUH9wS7_Q
https://www.youtube.com/watch?v=BSwLjwZS0-8
https://www.youtube.com/watch?v=JDD20nI8jrA
https://www.youtube.com/watch?v=IM_ps-Fbxak
Formulário 30
https://www.youtube.com/watch?v=77mPe0CKn2Y
https://www.youtube.com/watch?v=_EYMN2FqnV0
https://www.youtube.com/watch?v=2IcxKzVJwSQ
https://www.youtube.com/watch?v=sLeYpfSlmqM
https://www.youtube.com/watch?v=lUBiz7WwGRM
https://www.youtube.com/watch?v=fxhqNOfvxqI
https://www.youtube.com/watch?v=hf72jV4J5KQ
https://www.youtube.com/watch?v=IxbbPdXKmtQ
https://www.youtube.com/watch?v=vgP1Z9vLJsI
https://www.youtube.com/watch?v=xk_79sXGNmg`;

  // Função interna para extrair o ID do YouTube da URL
  function extrairVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const descricao = "Olá! Poderia nos ajudar a validar algumas transcrições?\n\n" +
                    "Estamos precisando de ajuda para avaliar as transcrições de 10 vídeos (até 2 minutos cada) sobre a Lei Felca. " +
                    "Sua tarefa é simples: assistir ao vídeo e dizer se a transcrição apresentada está Boa ou Ruim.\n\n" +
                    "O processo todo levará cerca de 20 minutos. Sua contribuição é fundamental para garantirmos a fidelidade do nosso trabalho!";

  // Processamento do texto bruto para organizar em um Array de Formulários
  const linhas = textoBruto.split('\n');
  const formularios = [];
  let formAtual = null;

  linhas.forEach(linha => {
    linha = linha.trim();
    if (linha.startsWith('Formulário')) {
      if (formAtual) formularios.push(formAtual);
      formAtual = { nome: linha, videos: [] };
    } else if (linha.startsWith('http')) {
      formAtual.videos.push(linha);
    }
  });
  if (formAtual) formularios.push(formAtual);

  // Criação iterativa dos formulários
  formularios.forEach(dados => {
    const form = FormApp.create(dados.nome + ' - Avaliação das Transcrições Lei Felca');
    form.setDescription(descricao);

    // Itera sobre cada URL de vídeo daquele formulário
    dados.videos.forEach((url, index) => {
      const numVideo = index + 1;
      const videoId = extrairVideoId(url);

      if (!videoId) return; // Pula se a URL for inválida

      // Adiciona o vídeo
      form.addVideoItem()
          .setTitle('Vídeo ' + numVideo)
          .setVideoUrl(url);

      // Adiciona a imagem procurando pelo nome do arquivo (ID do vídeo)
      const arquivos = pastaImagens.searchFiles('title contains "' + videoId + '"');
      if (arquivos.hasNext()) {
        const imagem = arquivos.next();
        form.addImageItem()
            .setTitle('Título da imagem')
            .setImage(imagem.getBlob());
      } else {
        Logger.log('AVISO: Imagem não encontrada para o vídeo ' + videoId + ' no ' + dados.nome);
      }

      // Adiciona pergunta múltipla escolha
      form.addMultipleChoiceItem()
          .setTitle('Classifique a transcrição do Vídeo ' + numVideo + ':')
          .setChoiceValues(['Boa', 'Ruim'])
          .setRequired(true);
    });

    Logger.log(dados.nome + ' criado com sucesso: ' + form.getEditUrl());
  });
}