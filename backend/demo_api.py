import requests
import json
import uuid

BASE_URL = "http://127.0.0.1:8000/api"

def demo():
    # 1. Register a new user
    username = f"hero_{uuid.uuid4().hex[:4]}"
    password = "SuperSecretPassword123"
    print(f"--- 1. Registering user: {username} ---")
    
    reg_data = {
        "username": username,
        "email": f"{username}@example.com",
        "password": password
    }
    
    try:
        r = requests.post(f"{BASE_URL}/auth/register/register/", json=reg_data)
        print(f"Status: {r.status_code}")
        print(f"Response: {r.text}")
        
        # 2. Login (Get JWT Token)
        print(f"\n--- 2. Logging in as {username} ---")
        login_data = {
            "username": username,
            "password": password
        }
        r = requests.post(f"{BASE_URL}/auth/login/", json=login_data)
        print(f"Status: {r.status_code}")
        tokens = r.json()
        access_token = tokens['access']
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        
        # 3. Create a Mission
        print("\n--- 3. Creating a Mission ---")
        mission_data = {
            "title": "Slay the Code Bug",
            "description": "Hunt down and resolve the mysterious red squiggles.",
            "priority": "High",
            "category": "Coding",
            "xp_reward": 150
        }
        r = requests.post(f"{BASE_URL}/missions/", json=mission_data, headers=headers)
        print(f"Status: {r.status_code}")
        print(r.json())
        
        # 4. List Missions
        print("\n--- 4. Listing My Missions ---")
        r = requests.get(f"{BASE_URL}/missions/", headers=headers)
        print(f"Status: {r.status_code}")
        missions = r.json()
        print(json.dumps(missions, indent=2))
        mission_id = missions[0]['id']
        
        # 5. Complete the Mission
        print(f"\n--- 5. Completing Mission {mission_id} ---")
        r = requests.patch(f"{BASE_URL}/missions/{mission_id}/", json={"is_completed": True}, headers=headers)
        print(f"Status: {r.status_code}")
        print(r.json())
        
        # 6. Check Dashboard (Post-Completion)
        print("\n--- 6. Checking Dashboard (After Completion) ---")
        r = requests.get(f"{BASE_URL}/missions/dashboard/", headers=headers)
        print(f"Status: {r.status_code}")
        dashboard = r.json()
        print(json.dumps(dashboard, indent=2))
        
        if dashboard['total_xp'] == 150 and dashboard['level'] == 2 and dashboard['current_streak'] == 1:
            print("\n✅ RPG Logic Verified: XP, Level, and Streak updated correctly!")
        else:
            print("\n❌ RPG Logic Failed: Dashboard metrics not matching expectations.")

    except Exception as e:
        print(f"Error during demo: {e}")

if __name__ == "__main__":
    demo()
