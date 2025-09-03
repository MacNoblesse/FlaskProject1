from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

app.secret_key = '7e1f6772a1b24c17d0ec5a9251c093f99bd3f596a3464666ddbd6ffbff81696e'

utilisateurs = [
    {"nom" : "admin", "mdp": "123456", "message" : ""},
    {"nom" : "marie", "mdp": "13579", "message" : ""},
    {"nom" : "hubert", "mdp": "654321", "message" : ""},
    {"nom" : "michel", "mdp": "1234", "message" : ""},
    {"nom" : "cathy", "mdp": "4321", "message" : ""},
]

def recherche_utilisateur(nom, mdp):
    for utilisateur in utilisateurs:
        if utilisateur['nom'] == nom and utilisateur['mdp'] == mdp:
            print("Utilisateur trouve !")
            return utilisateur
    return None

@app.route("/")
def base():
    return render_template("base.html")

@app.route("/chronometre")
def chronometre():
    return render_template("chronometre.html")

@app.route("/meteo")
def meteo():
    return render_template("index.html")

@app.route("/memoire")
def memoire():
    return render_template("memoire.html")

@app.route("/morpion")
def morpion():
    return render_template("morpion.html")

@app.route("/list")
def list():
    return render_template("list.html")

@app.route("/compteur")
def compteur():
    if "compteur" not in session:
        session["compteur"] = 1
    else:
        session["compteur"] = session["compteur"] + 1
    print(session)
    nb_visites = session["compteur"]
    return render_template("login.html", comp = nb_visites)

@app.route("/traitement", methods= ["POST", "GET"])
def traitement():
    if request.method == "POST":
        donnees = request.form
        nom = donnees.get("nom")
        mdp = donnees.get("mdp")
        message = donnees.get("message")

        user = recherche_utilisateur(nom, mdp)

        if user is not None:
            session["username"] = user['nom']
            session["password"] = user['mdp']
            session["message"] = user['message']
            if "compteur" not in session:
                session["compteur"] = 1
            else:
                session["compteur"] = session["compteur"] + 1
            print(session)
            nb_visites = session["compteur"]
            return render_template("login.html", comp = nb_visites)
            #return redirect(url_for("login"))
        else:
            print("Utilisateur inconnu")
            new_user = {"nom" : nom, "mdp" : mdp, "message" : message}
            utilisateurs.append(new_user)
            print(new_user)
            if "message" not in session:
                session["message"] = message
                
            if "compteur" not in session:
                session["compteur"] = 1
            else:
                session["compteur"] = session["compteur"] + 1
            print(session)
            nb_visites = session["compteur"]
            #session["username"] = new_user["nom"]
            # return redirect(url_for("espace_connecte"))
            return render_template("login.html", user = new_user, comp = nb_visites)
    else:
        # print(session)
        # if "username" in session:
        redirect(url_for("login"))
    return render_template("base.html")

@app.route("/racine")
def racine():
    return render_template("base.html")

@app.route("/logout")
def logout():
    print(session)
    session.pop('nom_utilisateur', None)
    print(session)
    return redirect(url_for('racine'))

if __name__ == "__main__":
    app.run(debug=True)