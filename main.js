
Webcam.set({
    width:350,
    height:300,
    imageFormat : 'png',
    pngQuality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera'); // Agora vamos passar a variável camera (que tem a div HTML) dentro de Webcam.attach()
//assim que a página for carregada, a webcam será acionada e você receberá um pop-up solicitando a permissão.


      
function takeSnapshot() //capturar imagem
{
    Webcam.snap(function(data_uri) { /*Webcam.snap() é uma função predefinida de webcam.js que é usada para tirar imagens 
    de uma webcam. Esta função contém data_uri que pode ser usada para mostrar a
    visualização da imagem que é gerada após tirar uma foto.*/
//usaremos esta data_uri para exibir a imagem.


        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
        /* Defina a tag img
      ● Então damos um id para essa tag img , para que depois possamos pegar essa imagem e passá-la para o
modelo para identificar a imagem capturada.
● Agora no src da tag img, passaremos data_uri. Para que esta imagem seja atualizada com a
selfie tirada e seja exibida na página da web.
        */
    });
}

  console.log('ml5 version:', ml5.version);
  /*Escreva uma mensagem de console para testar se o ml5.js está funcionando
  Aqui estamos usando a versão ml5.js. Portanto, se obtivermos o número da versão na tela
do console sem nenhum erro, significa que estamos prontos para usar a biblioteca ml5.js.*/


  //Agora vamos importar nosso modelo no arquivo.
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GBkA2h-Xp/model.json',modelLoaded);
/*imageClassifier é uma função predefinida de ml5.js que é usada para acionar a
função de classificação de imagem ml5.js.

 model - é o modelo que criamos no teachable machine. 
 
 json - JavaScript Object Notation é um formato de arquivo padrão aberto usado
para armazenar dados em um formato de objeto.
 Então, estamos adicionando isso no final do link, porque queremos apenas acessar
o modelo criado no teachable machine e nada mais.

● modelLoaded - Se não passarmos esta função, a classificação da imagem ml5 não será iniciada.
*/

  function modelLoaded() {
    console.log('Model Loaded!'); //Agora vamos consolar uma mensagem apenas para verificar se a classificação da imagem ml5 foi iniciada.
  }
  
function speak(){
  //Esta função nos ajudará a realizar a conversão de texto em fala dos resultados e falar os resultados obtidos do modelo.
  var synth = window.speechSynthesis; //Vamos definir uma API speechSynthesis e armazená-la dentro de uma variável
  speakData1 = "A primeira previsão é " + prediction1; 
  /*Primeiro, vamos definir uma variável para a previsão 1 e atribuir um write-up que diz "A primeira previsão é". 
  Em seguida, concatene a variável que conterá o resultado da previsão 1.*/
  speakData2 = "E a segunda previsão é " + prediction2;
  /*Agora, vamos definir outra variável para a previsão 2 e atribuir uma
escrita que diz “E a segunda previsão é”. Depois concatene a variável que conterá o resultado da previsão */
  var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
  /*Agora vamos converter este texto em fala

● utterThis - é uma variável na qual armazenaremos o texto convertido em fala.
● SpeechSynthesisUtterance - é a função de uma API que irá converter texto em fala.

● Estamos usando uma nova (new) palavra-chave porque, para cada próximo resultado,
queremos converter esse texto em fala.
● speakData1 - contém o texto que é o resultado da primeira previsão.
● speakData2 - contém o texto que é o resultado da segunda previsão.
  */
  synth.speak(utterThis);
}
/*Agora vamos passar a variável utterThis para a função speak() da API.
● synth - porque nesta, vamos armazenar a API no ponto 2.
● speak() - a função speak() é uma função pré-definida da API.
● utterThis - tem o valor convertido de texto em fala que queremos que o sistema fale
A funcionalidade da função speak() é acionar o sistema para falar o que for passado dentro dela.
*/

  function check()
  //O objetivo da função check() é obter a imagem capturada, passá-la para ml5.js, fazer uma comparação e chamar a função de resultado.
  {
    img = document.getElementById('captured_image'); //variável captured_image.
    classifier.classify(img, gotResult);
  }
/*colocamos a imagem capturada dentro de uma variável captured_image.
Agora vamos chamar a função predefinida de ml5.js que é usada para comparar a imagem
capturada com o modelo, e passar essa imagem dentro dela: classify

classifier é a variável que contém o modelo que importamos no início da
programação ml5.js na aula passada.

●classify é uma função predefinida de ml5.js que é usada para identificar a imagem
capturada usando o modelo e obter os resultados.

Na função classify somos obrigados a passar dois parâmetros: imagem capturada e gotresult

onde a variável img contém a imagem capturada.

onde a função gotResult conterá o resultado da comparação. Esta função será definida na
próxima etapa.

O objetivo desta função é mostrar o resultado obtido após identificar a imagem capturada usando o
modelo na função check().
*/

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("resultEmotionName").innerHTML = results[0].label;
    /*● A matriz que expandimos na tela do console é result, o que significa que primeiro
escreveremos results.
● Queremos a primeira etiqueta, e está dentro de um índice 0*/

    gesture = results[0].label;
    //Significa que queremos o índice 1, que está dentro dos resultados. Então vamos escrever results[1].
    toSpeak = " ";
    if(results[0].label == "Joinha")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#128077;";
    }
    if(results[0].label == "Vitoria")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#9996;&#65039;";
    }
    if(results[0].label == "de boas")
    {
	    document.getElementById("updateEmoji").innerHTML = "&#129305;";
    }

    if(results[1].label == "de boas")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#129305;";
    }
    if(results[1].label == "Joinha")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#128077;";
    }
    if(results[1].label == "Vitoria")
    {
	    document.getElementById("updateEmoji2").innerHTML = "&#9996;&#65039;";
    }
  }
}

/*● Você verá que todas as emoções estão lá com uma etiqueta de confidence.
● Assim, essas emoções são classificadas de acordo com a proximidade da imagem
capturada com o modelo. E seu rótulo de confiança define a precisão da decisão.

Observação: Tudo bem se alguma previsão der errado, porque esse modelo
é treinado em emoções limitadas - rostos felizes, tristes e irritados de poucos humanos.*/