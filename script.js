// =====================================
// IMPORT FIREBASE
// =====================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {

    getFirestore,

    collection,

    addDoc,

    getDocs,

    deleteDoc,

    updateDoc,

    doc

}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

import {

    getAuth,

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";



// =====================================
// CONFIG FIREBASE
// =====================================

const firebaseConfig = {

    apiKey: "AIzaSyDJ2kb2MbC2Lc_Nuwnw7YngDCy62mVOJ04",

    authDomain: "paroisse-web-a75f4.firebaseapp.com",

    projectId: "paroisse-web-a75f4",

    storageBucket: "paroisse-web-a75f4.firebasestorage.app",

    messagingSenderId: "60575182941",

    appId: "1:60575182941:web:926c35dea91fc1468a5db4"

};



// =====================================
// INITIALISATION
// =====================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);



// =====================================
// NOTIFICATION MODERNE
// =====================================

function notification(message){

    const notificationBox =
    document.createElement("div");

    notificationBox.innerText =
    message;

    notificationBox.style.position =
    "fixed";

    notificationBox.style.bottom =
    "20px";

    notificationBox.style.right =
    "20px";

    notificationBox.style.background =
    "#2563eb";

    notificationBox.style.color =
    "white";

    notificationBox.style.padding =
    "15px 25px";

    notificationBox.style.borderRadius =
    "14px";

    notificationBox.style.boxShadow =
    "0 10px 25px rgba(0,0,0,0.3)";

    notificationBox.style.zIndex =
    "9999";

    notificationBox.style.fontWeight =
    "bold";

    document.body.appendChild(
        notificationBox
    );

    setTimeout(() => {

        notificationBox.remove();

    }, 3000);

}



// =====================================
// INSCRIPTIONS
// =====================================

const formulaireInscription =
document.getElementById(
    "formulaireInscription"
);



if(formulaireInscription){

    formulaireInscription.addEventListener(

        "submit",

        async function(e){

            e.preventDefault();



            let nom =
            document.getElementById("nom").value;

            let prenom =
            document.getElementById("prenom").value;

            let telephone =
            document.getElementById("telephone").value;

            let email =
            document.getElementById("email").value;

            let adresse =
            document.getElementById("adresse").value;

            let groupe =
            document.getElementById("groupe").value;



            try{

                await addDoc(

                    collection(
                        db,
                        "inscriptions"
                    ),

                    {

                        nom,
                        prenom,
                        telephone,
                        email,
                        adresse,
                        groupe,
                        date:
                        new Date()

                    }

                );



                notification(
                    "Inscription enregistrée"
                );



                formulaireInscription.reset();

            }catch(error){

                notification(
                    "Erreur d'inscription"
                );

            }

        }

    );

}



// =====================================
// AFFICHER INSCRIPTIONS
// =====================================

async function afficherInscriptions(){

    const liste =
    document.getElementById(
        "listeInscriptions"
    );



    const compteur =
    document.getElementById(
        "totalMembres"
    );



    if(!liste){

        return;

    }



    liste.innerHTML = "";



    const querySnapshot =
    await getDocs(

        collection(
            db,
            "inscriptions"
        )

    );



    let total = 0;



    querySnapshot.forEach((documentFirebase) => {

        total++;

        const data =
        documentFirebase.data();



        liste.innerHTML += `

        <div class="feature">

            <h3>

                ${data.nom} ${data.prenom}

            </h3>

            <p>

                📞 ${data.telephone}

            </p>

            <p>

                📧 ${data.email}

            </p>

            <p>

                👥 ${data.groupe}

            </p>

            <button
            onclick="modifierMembre(
                '${documentFirebase.id}',
                '${data.telephone}',
                '${data.groupe}'
            )">

                Modifier

            </button>

            <br><br>

            <button
            onclick="supprimerMembre(
                '${documentFirebase.id}'
            )">

                Supprimer

            </button>

        </div>

        <br>

        `;

    });



    if(compteur){

        compteur.innerHTML =
        total + " membre(s)";

    }

}



afficherInscriptions();



// =====================================
// MODIFIER MEMBRE
// =====================================

window.modifierMembre =
async function(id, ancienTelephone, ancienGroupe){

    let nouveauTelephone =
    prompt(
        "Nouveau téléphone",
        ancienTelephone
    );



    let nouveauGroupe =
    prompt(
        "Nouveau groupe",
        ancienGroupe
    );



    if(nouveauTelephone && nouveauGroupe){

        await updateDoc(

            doc(
                db,
                "inscriptions",
                id
            ),

            {

                telephone:
                nouveauTelephone,

                groupe:
                nouveauGroupe

            }

        );



        notification(
            "Membre modifié"
        );



        afficherInscriptions();

    }

};



// =====================================
// SUPPRESSION MEMBRE
// =====================================

window.supprimerMembre =
async function(id){

    let confirmation =
    confirm(
        "Supprimer ce membre ?"
    );



    if(confirmation){

        await deleteDoc(

            doc(
                db,
                "inscriptions",
                id
            )

        );



        notification(
            "Membre supprimé"
        );



        afficherInscriptions();

    }

};



// =====================================
// DEMANDES DE MESSE
// =====================================

const formulaireMesse =
document.getElementById(
    "formulaireMesse"
);



if(formulaireMesse){

    formulaireMesse.addEventListener(

        "submit",

        async function(e){

            e.preventDefault();



            let nom =
            document.getElementById("nom").value;

            let telephone =
            document.getElementById("telephone").value;

            let typeMesse =
            document.getElementById("typeMesse").value;

            let dateMesse =
            document.getElementById("dateMesse").value;

            let message =
            document.getElementById("message").value;



            try{

                await addDoc(

                    collection(
                        db,
                        "demandes_messe"
                    ),

                    {

                        nom,
                        telephone,
                        typeMesse,
                        dateMesse,
                        message,
                        date:
                        new Date()

                    }

                );



                notification(
                    "Demande de messe envoyée"
                );



                formulaireMesse.reset();

            }catch(error){

                notification(
                    "Erreur lors de l'envoi"
                );

            }

        }

    );

}



// =====================================
// AFFICHER MESSES
// =====================================

async function afficherMesses(){

    const liste =
    document.getElementById(
        "listeMesses"
    );



    const compteur =
    document.getElementById(
        "totalMesses"
    );



    if(!liste){

        return;

    }



    liste.innerHTML = "";



    const querySnapshot =
    await getDocs(

        collection(
            db,
            "demandes_messe"
        )

    );



    let total = 0;



    querySnapshot.forEach((docFirebase) => {

        total++;

        const data =
        docFirebase.data();



        liste.innerHTML += `

        <div class="feature">

            <h3>

                ${data.nom}

            </h3>

            <p>

                📞 ${data.telephone}

            </p>

            <p>

                ✝️ ${data.typeMesse}

            </p>

            <p>

                📅 ${data.dateMesse}

            </p>

            <p>

                📝 ${data.message}

            </p>

        </div>

        <br>

        `;

    });



    if(compteur){

        compteur.innerHTML =
        total + " demande(s)";

    }

}



afficherMesses();



// =====================================
// ADMIN
// =====================================

window.connexionAdmin = function(){

    let cle =
    prompt(
        "Entrez la clé administrateur"
    );



    if(cle === "Paroisse 2006"){

        notification(
            "Connexion réussie"
        );

    }else{

        notification(
            "Clé incorrecte"
        );

    }

};



window.publierAnnonce = function(){

    let annonce =
    prompt(
        "Votre annonce"
    );



    if(annonce){

        notification(
            "Annonce publiée"
        );

    }

};



window.voirStatistiques = function(){

    notification(
        "Statistiques mises à jour"
    );

};



window.deconnexion = function(){

    notification(
        "Déconnexion..."
    );

    setTimeout(() => {

        location.reload();

    }, 1000);

};



// =====================================
// INSCRIPTION MEMBRE
// =====================================

const formulaireRegister =
document.getElementById(
    "formulaireRegister"
);



if(formulaireRegister){

    formulaireRegister.addEventListener(

        "submit",

        async function(e){

            e.preventDefault();



            let nom =
            document.getElementById(
                "registerNom"
            ).value;



            let email =
            document.getElementById(
                "registerEmail"
            ).value;



            let password =
            document.getElementById(
                "registerPassword"
            ).value;



            try{

                await createUserWithEmailAndPassword(

                    auth,
                    email,
                    password

                );



                notification(
                    "Compte créé avec succès"
                );



                setTimeout(() => {

                    window.location.href =
                    "login.html";

                }, 1500);



            }catch(error){

                notification(
                    error.message
                );

            }

        }

    );

}



// =====================================
// CONNEXION MEMBRE
// =====================================

const formulaireConnexion =
document.getElementById(
    "formulaireConnexion"
);



if(formulaireConnexion){

    formulaireConnexion.addEventListener(

        "submit",

        async function(e){

            e.preventDefault();



            let email =
            document.getElementById(
                "loginEmail"
            ).value;



            let password =
            document.getElementById(
                "loginPassword"
            ).value;



            try{

                await signInWithEmailAndPassword(

                    auth,
                    email,
                    password

                );



                notification(
                    "Connexion réussie"
                );



                setTimeout(() => {

                    window.location.href =
                    "compte.html";

                }, 1500);



            }catch(error){

                notification(
                    "Email ou mot de passe incorrect"
                );

            }

        }

    );

}



// =====================================
// DECONNEXION MEMBRE
// =====================================

window.deconnexionMembre =
async function(){

    await signOut(auth);

    notification(
        "Déconnexion réussie"
    );



    setTimeout(() => {

        window.location.href =
        "login.html";

    }, 1000);

};



// =====================================
// VERIFICATION UTILISATEUR
// =====================================

onAuthStateChanged(auth, (user) => {

    const nomUtilisateur =
    document.getElementById(
        "nomUtilisateur"
    );



    if(user && nomUtilisateur){

        nomUtilisateur.innerHTML =
        user.email;

    }

});