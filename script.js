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

    signOut

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
// CREATION DE COMPTE
// =====================================

const registerForm =
document.getElementById(
    "registerForm"
);



if(registerForm){

    registerForm.addEventListener(

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



                await addDoc(

                    collection(
                        db,
                        "users"
                    ),

                    {

                        nom,
                        email,
                        date:
                        new Date()

                    }

                );



                alert(
                    "Compte créé avec succès"
                );



                window.location.href =
                "login.html";

            }

            catch(erreur){

                alert(
                    erreur.message
                );

            }

        }

    );

}



// =====================================
// CONNEXION
// =====================================

const loginForm =
document.getElementById(
    "loginForm"
);



if(loginForm){

    loginForm.addEventListener(

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



                alert(
                    "Connexion réussie"
                );



                window.location.href =
                "compte.html";

            }

            catch(erreur){

                alert(
                    erreur.message
                );

            }

        }

    );

}



// =====================================
// DECONNEXION MEMBRE
// =====================================

window.deconnexionCompte =
async function(){

    await signOut(auth);

    alert(
        "Déconnexion réussie"
    );

    window.location.href =
    "login.html";

};



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



            alert(
                "Inscription enregistrée"
            );



            formulaireInscription.reset();

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



        alert(
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



        alert(
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



            let autreType =
            document.getElementById(
                "autreTypeMesse"
            ).value;



            if(typeMesse === "autre"){

                typeMesse =
                autreType;

            }



            let dateMesse =
            document.getElementById("dateMesse").value;



            let heureMesse =
            document.getElementById("heureMesse").value;



            let message =
            document.getElementById("message").value;



            await addDoc(

                collection(
                    db,
                    "messes"
                ),

                {

                    nom,
                    telephone,
                    typeMesse,
                    dateMesse,
                    heureMesse,
                    message,
                    date:
                    new Date()

                }

            );



            alert(
                "Demande de messe envoyée"
            );



            formulaireMesse.reset();

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
            "messes"
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

                ⏰ ${data.heureMesse}

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



    if(cle === "Paroisse2006"){

        alert(
            "Connexion réussie"
        );

    }else{

        alert(
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

        alert(
            "Annonce publiée : \n\n" +
            annonce
        );

    }

};



window.voirStatistiques = function(){

    alert(
        "Statistiques mises à jour automatiquement"
    );

};



window.deconnexion = function(){

    location.reload();

};