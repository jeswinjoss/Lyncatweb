import requests
import sys
import json
from datetime import datetime

class LyncatAPITester:
    def __init__(self, base_url="https://career-booster-29.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.log_test(name, True)
                try:
                    return True, response.json()
                except:
                    return True, {}
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                try:
                    error_detail = response.json()
                    error_msg += f" - {error_detail}"
                except:
                    error_msg += f" - {response.text[:200]}"
                
                self.log_test(name, False, error_msg)
                return False, {}

        except requests.exceptions.RequestException as e:
            self.log_test(name, False, f"Request failed: {str(e)}")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Unexpected error: {str(e)}")
            return False, {}

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_user_data = {
            "email": f"test_user_{timestamp}@example.com",
            "password": "TestPass123!",
            "full_name": f"Test User {timestamp}"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_user_data
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.user_id = response['user']['id']
            return True, test_user_data
        return False, test_user_data

    def test_user_login(self, user_data):
        """Test user login"""
        login_data = {
            "email": user_data["email"],
            "password": user_data["password"]
        }
        
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data=login_data
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            return True
        return False

    def test_get_current_user(self):
        """Test get current user"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "auth/me",
            200
        )
        return success

    def test_create_resume(self):
        """Test resume creation"""
        resume_data = {
            "title": "Test Resume",
            "template": "modern",
            "data": {
                "personal_info": {
                    "full_name": "John Doe",
                    "email": "john@example.com",
                    "phone": "+1234567890",
                    "location": "New York, NY",
                    "summary": "Experienced software developer"
                },
                "work_experience": [
                    {
                        "company": "Tech Corp",
                        "position": "Software Engineer",
                        "location": "NYC",
                        "start_date": "2020-01",
                        "end_date": "2023-12",
                        "current": False,
                        "description": "Developed web applications"
                    }
                ],
                "education": [
                    {
                        "institution": "University of Tech",
                        "degree": "Bachelor of Science",
                        "field": "Computer Science",
                        "location": "NYC",
                        "start_date": "2016-09",
                        "end_date": "2020-05"
                    }
                ],
                "skills": ["JavaScript", "Python", "React", "Node.js"],
                "certifications": ["AWS Certified"]
            }
        }
        
        success, response = self.run_test(
            "Create Resume",
            "POST",
            "resumes",
            200,
            data=resume_data
        )
        
        if success and 'id' in response:
            return True, response['id']
        return False, None

    def test_get_resumes(self):
        """Test get all resumes"""
        success, response = self.run_test(
            "Get All Resumes",
            "GET",
            "resumes",
            200
        )
        return success, response if success else []

    def test_get_resume_by_id(self, resume_id):
        """Test get specific resume"""
        success, response = self.run_test(
            "Get Resume by ID",
            "GET",
            f"resumes/{resume_id}",
            200
        )
        return success

    def test_update_resume(self, resume_id):
        """Test resume update"""
        update_data = {
            "title": "Updated Test Resume",
            "template": "classic",
            "data": {
                "personal_info": {
                    "full_name": "John Doe Updated",
                    "email": "john.updated@example.com",
                    "phone": "+1234567890",
                    "location": "San Francisco, CA",
                    "summary": "Senior software developer with 5+ years experience"
                },
                "skills": ["JavaScript", "Python", "React", "Node.js", "Docker"]
            }
        }
        
        success, response = self.run_test(
            "Update Resume",
            "PUT",
            f"resumes/{resume_id}",
            200,
            data=update_data
        )
        return success

    def test_delete_resume(self, resume_id):
        """Test resume deletion"""
        success, response = self.run_test(
            "Delete Resume",
            "DELETE",
            f"resumes/{resume_id}",
            200
        )
        return success

    def test_invalid_endpoints(self):
        """Test error handling for invalid endpoints"""
        # Test non-existent resume
        success, response = self.run_test(
            "Get Non-existent Resume",
            "GET",
            "resumes/invalid-id",
            404
        )
        
        # Test unauthorized access (without token)
        old_token = self.token
        self.token = None
        success2, response2 = self.run_test(
            "Unauthorized Access",
            "GET",
            "resumes",
            401
        )
        self.token = old_token
        
        return success and success2

    def run_all_tests(self):
        """Run complete test suite"""
        print("🚀 Starting Lyncat API Test Suite")
        print("=" * 50)
        
        # Test user registration and authentication
        reg_success, user_data = self.test_user_registration()
        if not reg_success:
            print("❌ Registration failed, stopping tests")
            return self.get_summary()
        
        # Test login
        login_success = self.test_user_login(user_data)
        if not login_success:
            print("❌ Login failed, stopping tests")
            return self.get_summary()
        
        # Test get current user
        self.test_get_current_user()
        
        # Test resume operations
        create_success, resume_id = self.test_create_resume()
        if create_success and resume_id:
            self.test_get_resumes()
            self.test_get_resume_by_id(resume_id)
            self.test_update_resume(resume_id)
            # Keep resume for frontend testing, don't delete yet
            # self.test_delete_resume(resume_id)
        
        # Test error handling
        self.test_invalid_endpoints()
        
        return self.get_summary()

    def get_summary(self):
        """Get test summary"""
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check details above.")
            failed_tests = [r for r in self.test_results if not r['success']]
            print("\nFailed tests:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
            return False

def main():
    """Main test execution"""
    tester = LyncatAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())