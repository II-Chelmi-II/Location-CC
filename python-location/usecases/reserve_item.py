from domain.reservation import Reservation

def reserve_item(item, start_date, end_date):
    try:
        Reservation(item, start_date, end_date)
        return {"success": True, "message": "Réservation réussie."}
    except ValueError as e:
        return {"success": False, "message": str(e)}