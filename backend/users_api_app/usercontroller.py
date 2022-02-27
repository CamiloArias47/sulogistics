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
                # total_sales+=subordinate.sales
            
            total_sales = self.get_total_sales(subordinates)

            return {
                'subordinates':subordinates_srzed,
                'boss' : boss,
                'subordinates_total_sales' : total_sales
                }
        
        return None

    def get_total_sales(self, subor):
        total_sales = 0

        def sum(subordinates):
            nonlocal  total_sales 
            print('::::inicio::::::')
            total = subordinates.count()-1
            i = 0
            while i <= total :
                eid = subordinates[i].employee_id
                name = subordinates[i].name
                lastname = subordinates[i].lastname
                sales = subordinates[i].sales
                print('name',name, lastname)
                print('sales',sales)
                hijos = UserProfile.objects.filter(boss = eid)
                total_sales+= sales
                i+=1
                if hijos.count() > 0:
                    print('tengo hijos...')
                    sum(hijos[:hijos.count()-1])
        
        sum(subor)
        # print('value final',total_sales)
        return total_sales




 

