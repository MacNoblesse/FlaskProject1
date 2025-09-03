from pathlib import Path
import time

dico = {
    ".png":"Images",
    ".jpg":"Images",
    ".exe":"Applis",
    ".mp4":"Videos"
}

tri_dir = Path.home() / "Downloads"
files = [f for f in tri_dir.iterdir() if f.is_file()]
for f in files:
    output_dir = tri_dir / dico.get(f.suffix, "Autres")
    output_dir.mkdir(exist_ok=True)
    f.rename(output_dir / f.name)

time.sleep(180) #Suspendre l'execution du programme pendant une duree specifiee