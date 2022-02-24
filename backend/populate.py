import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

import datetime
from users_api_app.models import UserProfile
from django.contrib.auth.hashers import make_password

def populate():
    """
        Read the BDprueba.csv file and create an user per row 
        execute in console
    """
    with open('./BDprueba.csv', 'r', encoding='utf-8') as f:
        formated_data = []
        total_lines = 0

        for linerow in f:
            row = {}
            if total_lines > 0:
                campos = linerow.split(',')
                
                national_id = int(campos[3].replace('.','') )
                birthday = datetime.datetime.strptime(f'{campos[4]} 00:00:00', '%d/%m/%Y %H:%M:%S')
                start_date = datetime.datetime.strptime(f'{campos[6]} 00:00:00', '%d/%m/%Y %H:%M:%S')
                phone = int( campos[17].replace('-','') )
                password = make_password(campos[15])
                picture = campos[16]
                name = campos[0]
                lastname = campos[1]
                lastname2 = campos[2]
                gender = campos[5]
                employee_id = campos[7]
                position = campos[8]
                zone = campos[10]
                city = campos[11]
                department = campos[12]
                email = campos[14]

                if campos[9] == '':
                    boss = 0
                else:
                    boss = int(campos[9])


                if campos[13] == '':
                    sales = 0
                else:
                    sales = campos[13].replace('$','') 
                    sales = int( sales.replace('.','') )

                q = UserProfile(
                    name=name,
                    lastname=lastname,
                    lastname2=lastname2,
                    national_id=national_id,
                    birthday=birthday,
                    gender=gender,
                    start_date=start_date,
                    employee_id=employee_id,
                    position=position,
                    boss=boss,
                    zone=zone,
                    city=city,
                    department=department,
                    sales=sales,
                    email=email,
                    password=password,
                    picture=picture,
                    phone=phone
                )
                q.save()
                formated_data.append(row)

            total_lines += 1
    

def run():
    populate()


if __name__ == '__main__':
    run()
