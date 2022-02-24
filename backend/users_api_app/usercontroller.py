from .models import UserProfile
from .serializers import UserProfileSerializer

class UserController(object):
    
    def __init__(self) -> None:
        super().__init__()
    

    def get_worker(self, wid):
         worker = UserProfile.objects.get(pk=wid)
         eid = worker.employee_id
         print('controller::::::')
         print(eid)        

