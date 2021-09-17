import json
import pprint
import datetime

with open(".\src\initial_data.json", 'r') as json_file:
    data = json.load(json_file)
    for i in range(1, 10):
        data['sprints'].append({
            "sprint_number": i,
            "description": "",
            "intervale_date": f"{datetime.date.fromisoformat('2021-09-20') + datetime.timedelta(days=14)*i} - {datetime.date.fromisoformat('2021-09-20') + datetime.timedelta(days=14)*(1+i) - datetime.timedelta(days=1)}",
            "added": [],
            "doing": [],
            "done": [],
            "onhold": [],
            "deprecated": [],
            "observations": []
        })
    print(data['sprints'][i-1]["intervale_date"])
json.dump(data, open(".\src\initial_data.json", 'w'), indent=4)