from infrastructure.in_memory_repository import InMemoryLocationRepository
from presentation.cli import start_cli

repo = InMemoryLocationRepository()

# Ajouter des objets
repo.add_item("Voiture Tesla Model Y")
repo.add_item("Appartement à Antananarivo")
repo.add_item("Drone DJI Mini 3 Pro")
repo.add_item("Caméra Sony FX30")
repo.add_item("Studio musique")

# Lancer l'application
start_cli(repo)