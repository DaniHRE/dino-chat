var input = document.getElementById("msg");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                enviarMSG();
            }
        });

        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
        import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDBDSlqtfLp_QA3d6kmSmRikrJ0p_57Zj0",
            authDomain: "testes-senai.firebaseapp.com",
            projectId: "testes-senai",
            storageBucket: "testes-senai.appspot.com",
            messagingSenderId: "619750994224",
            appId: "1:619750994224:web:b6b00e0b756367997f58f5",
            measurementId: "G-3BRCRBT98N"
        };

        const app = initializeApp(firebaseConfig);

        var db = getDatabase(app);
        const dbRef = ref(db, 'exemplo');

        var meuhtml = "";

        var nomeUsuario = prompt("Digite seu nome");

        if (nomeUsuario == undefined || nomeUsuario == "" || nomeUsuario == null) {
            nomeUsuario = "Random"
        }

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            // console.log(data);
            meuhtml = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;

                // Exibir Key
                // console.log(key);
                // console.log(childSnapshot.val().nome,
                    // childSnapshot.val().mensagem,
                    // childSnapshot.val().horario);

                if (nomeUsuario === childSnapshot.val().nome) {
                    // console.log("Minha Mensagem")
                    meuhtml += '<div class="sended"><div id="boxMe" class="msg me self conteudo"><b>' + childSnapshot.val().nome + '<a id="' + key + '" class="deletemsg"><i class="fa-solid fa-trash-can"></i></a>' + '</i></b><span>' + childSnapshot.val().mensagem + '</span></div></div>';
                }
                else {
                    // console.log("Mensagem do Outro")
                    meuhtml += '<div class="stay"> <div id="boxSended" class="msg outros other conteudo"><b>' + childSnapshot.val().nome + '</i></b><span>' + childSnapshot.val().mensagem + '</span></div></div>';
                }

            });
            atualizarHTML();
        });

        function enviarMSG() {

            var datahj = new Date();
            var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()

            push(ref(db, 'exemplo'), {
                nome: nomeUsuario,
                horario: hora,
                mensagem: document.getElementById("msg").value
            });

            document.getElementById("msg").value = "";
        }

        function atualizarHTML() {
            document.getElementById("conteudo").innerHTML = meuhtml
            var arrMsg = Array.from(document.querySelectorAll(".deletemsg"));
            console.log(arrMsg)
            arrMsg.forEach((msg) => {
                msg.addEventListener("click", () => {
                    deleteMsg(msg.id)
                })
            })
            ajustarScroll();
        }

        function ajustarScroll() {
            console.log("corrirgir scroll");
            var divConteudo = document.getElementById("conteudo");
            divConteudo.scrollTop = divConteudo.scrollHeight;
        }

        function deleteMsg(key) {
            var id = key;
            console.log(id)
            remove(ref(db, 'exemplo/' + id));
        }
