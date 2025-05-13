from datetime import datetime
from usecases.reserve_item import reserve_item

def show_menu():
    print("\n--- Menu ---")
    print("1. Voir les objets disponibles")
    print("2. Réserver un objet")
    print("3. Voir les réservations actives")
    print("4. Quitter")

def parse_date(input_str):
    try:
        return datetime.strptime(input_str, "%Y-%m-%d")
    except ValueError:
        return None

def start_cli(repo):
    while True:
        show_menu()
        choice = input("Choisissez une option: ")

        if choice == "1":
            print("\nObjets disponibles:")
            for item in repo.get_all_items():
                print(f"{item.id}. {item.name}")

        elif choice == "2":
            print("\n--- Réserver un objet ---")
            for item in repo.get_all_items():
                print(f"{item.id}. {item.name}")

            try:
                item_id = int(input("Entrez l'ID de l'objet: "))
                item = repo.find_by_id(item_id)
                if not item:
                    print("Objet introuvable.")
                    continue

                start_input = input("Date de début (YYYY-MM-DD): ")
                end_input = input("Date de fin (YYYY-MM-DD): ")

                start_date = parse_date(start_input)
                end_date = parse_date(end_input)

                if not start_date or not end_date:
                    print("Dates invalides.")
                    continue

                result = reserve_item(item, start_date, end_date)
                print(result["message"])

                if not result["success"] and "déjà réservé" in result["message"]:
                    busy = item.get_active_reservations(datetime.now())
                    if busy:
                        print("Périodes prises :", ", ".join(
                            [f"du {res['start'].date()} au {res['end'].date()}" for res in busy]
                        ))

            except ValueError:
                print("Entrée invalide.")

        elif choice == "3":
            print("\n--- Réservations Actives ---")
            now = datetime.now()
            for item in repo.get_all_items():
                actives = item.get_active_reservations(now)
                if actives:
                    print(f"\n{item.name} :")
                    for res in actives:
                        print(f"  - du {res['start'].date()} au {res['end'].date()}")

        elif choice == "4":
            print("Fermeture de l'application.")
            break

        else:
            print("Option invalide.")