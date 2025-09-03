import os

class AnalyseFichier:
    def __init__(self):
        pass

    def compter_lignes(self, mon_fichier):
        try:
            with open (mon_fichier, "r") as fichier:
                lignes = fichier.readlines() #Chaque ligne est un element de la liste
                return len(lignes)
        except FileNotFoundError:
            print(f"Fichier {mon_fichier} introuvable.")
        except Exception as e:
            print(f"Erreur lors de l'ouverture du fichier: {e}")

    def compter_mots(self, mon_fichier):
        try:
            with open(mon_fichier, "r") as fichier:
                contenu = fichier.read()
                mots = contenu.split() #cree une liste a partir d'une chaine ou chaque element de la liste est un mot e la chaine separe par un espace
                return len(mots)
        except FileNotFoundError:
            print(f"Fichier {mon_fichier} introuvable")
        except Exception as e:
            print(f"Erreur lors de l'ouverture du fichier: {e}")

    def compter_caracteres(self, mon_fichier):
        try:
            with open(mon_fichier, "r") as fichier:
                contenu = fichier.read()
                return len(contenu)
        except FileNotFoundError:
            print(f"Fichier {mon_fichier} introuvable")
        except Exception as e:
            print(f"Erreur lots de l'ouverture du fichier: {e}.")

    def analyse_fichier(self, mon_fichier):
        lignes = self.compter_lignes(mon_fichier)
        mots = self.compter_mots(mon_fichier)
        caracteres = self.compter_caracteres(mon_fichier)
        if lignes is not None and caracteres is not None and mots is not None:
            print(f"Analyse du fichier {mon_fichier}: ")
            print(f"Nombre de lignes: {lignes}")
            print(f"Nombre de mots: {mots}")
            print(f"Nombre de caracteres: {caracteres}")
    

    def menu(self):
        while True:
            print("Analyse de fichiers")
            print("1. Analyser un fichier")
            print("2. Quitter")

            choix = input ("Entrez votre choix: ")

            if choix == "1":
                mon_fichier = input("Entrez le nom du fichier: ")
                self.analyse_fichier(mon_fichier)
            elif choix == "2":
                break
            else:
                print("Choix invalide. Veuillez reessayer.")


if __name__ == "__main__":
    analyse = AnalyseFichier()
    analyse.menu()