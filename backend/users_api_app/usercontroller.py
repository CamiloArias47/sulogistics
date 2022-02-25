from .models import UserProfile
from .serializers import UserProfileSerializer

class UserController(object):
    
    def __init__(self) -> None:
        super().__init__()
    

    def get_worker(self, wid):
        """
            Get an user and retun it whit his/her boss, his/her coworkers subordinates
        """
        worker = UserProfile.objects.filter(pk=wid).first()
        if worker is not None:
            subordinates_srzed = []
            eid = worker.employee_id
            bid = worker.boss
            boss = {}
            total_sales = 0

            #si el usuario tiene jefe
            if eid > 0:
                boss = UserProfile.objects.filter(employee_id = bid).first()
                boss = UserProfileSerializer(boss).data

            subordinates = UserProfile.objects.filter(boss = eid)
            for subordinate in subordinates:
                subordinates_srzed.append( UserProfileSerializer(subordinate).data )
                total_sales+=subordinate.sales

            return {
                'subordinates':subordinates_srzed,
                'boss' : boss,
                'subordinates_total_sales' : total_sales
                }
        
        return None



 

