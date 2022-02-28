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
            subalternos_ids = []
            
            #si el usuario tiene jefe
            if eid > 0:
                boss = UserProfile.objects.filter(employee_id = bid).first()
                boss = UserProfileSerializer(boss).data

            subordinates = UserProfile.objects.filter(boss = eid)
            for subordinate in subordinates:
                sid = subordinate.employee_id
                subalternos_ids.append(sid)
                sales_sub, subids = self.get_total_sales(sid)
                subalternos_ids+=subids
                subordinate.sales = sales_sub
                subordinates_srzed.append( UserProfileSerializer(subordinate).data )
                total_sales = total_sales + sales_sub

            return {
                'subordinates':subordinates_srzed,
                'subordinates_ids':subalternos_ids,
                'boss' : boss,
                'subordinates_total_sales' : total_sales,
                }
        
        return None


    def get_total_sales(self, subor_id):
        total_sales = 0
        subs_ids = []

        #obtine recursiva de un empleado y sus subalternos
        def sum(subordinates):
            nonlocal total_sales 
            nonlocal subs_ids

            total = subordinates.count()-1
            i = 0
            while i <= total:
                eid = subordinates[i].employee_id
                sales = subordinates[i].sales
                subs_ids.append(eid)
                hijos = UserProfile.objects.filter(boss = eid)
                total_sales+= sales
                sum(hijos)
                i+=1

        #Obtenemos el subordinado
        subor = UserProfile.objects.filter(employee_id = subor_id)
        sum(subor)

        return total_sales, subs_ids




 

