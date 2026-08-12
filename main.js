// ====================================================
        // ELEMENTOS
        // ====================================================

        const cena =
            document.querySelector("#cena");


        const track =
            document.querySelector("#track");


        const video =
            document.querySelector("#videoAR");


        const videoPlane =
            document.querySelector("#videoPlane");


        const btnIniciar =
            document.querySelector("#btnIniciar");


        const mensagem =
            document.querySelector("#mensagem");


        // ====================================================
        // ESTADO
        // ====================================================

        let experienciaIniciada = false;

        let trackEncontrada = false;

        let videoIniciado = false;


        // ====================================================
        // CENA CARREGADA
        // ====================================================

        cena.addEventListener(
            "loaded",
            function () {

                console.log(
                    "A-Frame carregado."
                );

            }
        );


        // ====================================================
        // BOTÃO INICIAR VÍDEO
        // ====================================================

        btnIniciar.addEventListener(
            "click",
            function () {

                console.log(
                    "Botão iniciar vídeo pressionado."
                );


                // =============================================
                // MARCA QUE O USUÁRIO INICIOU O VÍDEO
                // =============================================

                videoIniciado = true;


                // =============================================
                // REPRODUZ O VÍDEO
                // =============================================

                video.play()
                    .then(function () {

                        console.log(
                            "Vídeo iniciado."
                        );

                    })
                    .catch(function (erro) {

                        console.warn(
                            "Erro ao iniciar vídeo:",
                            erro
                        );

                    });


                // =============================================
                // ESCONDE O BOTÃO
                // =============================================

                btnIniciar.style.display =
                    "none";


                mensagem.innerHTML =
                    "Vídeo reproduzindo";


            }
        );


        // ====================================================
        // TRACK ENCONTRADA
        // ====================================================

        track.addEventListener(
            "targetFound",
            function () {

                console.log(
                    "================================"
                );

                console.log(
                    "TRACK ENCONTRADA!"
                );

                console.log(
                    "================================"
                );


                trackEncontrada = true;


                // =============================================
                // MOSTRA VÍDEO
                // =============================================

                videoPlane.setAttribute(
                    "visible",
                    "true"
                );


                // =============================================
                // POSIÇÃO
                // =============================================

                videoPlane.setAttribute(
                    "position",
                    "0 0 0.01"
                );


                // =============================================
                // SE O VÍDEO JÁ FOI INICIADO PELO USUÁRIO
                // =============================================

                if (videoIniciado) {


                    console.log(
                        "Continuando vídeo."
                    );


                    // Continua exatamente
                    // do ponto em que parou

                    video.play()
                        .then(function () {

                            console.log(
                                "Vídeo continuando."
                            );

                        })
                        .catch(function (erro) {

                            console.warn(
                                "Não foi possível continuar:",
                                erro
                            );

                        });


                    mensagem.innerHTML =
                        "Vídeo reproduzindo";


                }

                else {


                    // =========================================
                    // PRIMEIRA VEZ QUE A TRACK É ENCONTRADA
                    // =========================================

                    console.log(
                        "Aguardando usuário iniciar o vídeo."
                    );


                    // O vídeo fica pausado

                    video.pause();


                    // Mostra o botão

                    btnIniciar.style.display =
                        "block";


                    mensagem.innerHTML =
                        "Track reconhecida";


                }

            }
        );


        // ====================================================
        // TRACK PERDIDA
        // ====================================================

        track.addEventListener(
            "targetLost",
            function () {

                console.log(
                    "================================"
                );

                console.log(
                    "TRACK PERDIDA!"
                );

                console.log(
                    "================================"
                );


                trackEncontrada = false;


                // =============================================
                // ESCONDE VÍDEO
                // =============================================

                videoPlane.setAttribute(
                    "visible",
                    "false"
                );


                // =============================================
                // PAUSA O VÍDEO
                // =============================================

                video.pause();


                // =============================================
                // NÃO ALTERAMOS video.currentTime
                // =============================================
                //
                // Isso é MUITO importante.
                //
                // O vídeo permanece exatamente no ponto
                // onde estava quando a track foi perdida.
                //
                // =============================================


                // =============================================
                // ESCONDE O BOTÃO
                // =============================================

                btnIniciar.style.display =
                    "none";


                mensagem.innerHTML =
                    "Aponte a câmera para a imagem";


            }
        );


        // ====================================================
        // VÍDEO TERMINOU
        // ====================================================

        video.addEventListener(
            "ended",
            function () {

                console.log(
                    "Vídeo terminou."
                );


                // =============================================
                // MARCA COMO NÃO INICIADO
                // =============================================

                videoIniciado = false;


                // =============================================
                // SE A TRACK AINDA ESTIVER PRESENTE
                // MOSTRA O BOTÃO NOVAMENTE
                // =============================================

                if (trackEncontrada) {

                    btnIniciar.style.display =
                        "block";


                    mensagem.innerHTML =
                        "Vídeo finalizado";

                }

            }
        );


        // ====================================================
        // ERRO NO VÍDEO
        // ====================================================

        video.addEventListener(
            "error",
            function (erro) {

                console.error(
                    "Erro no vídeo:",
                    erro
                );


                mensagem.innerHTML =
                    "Erro ao carregar o vídeo.";

            }
        );
