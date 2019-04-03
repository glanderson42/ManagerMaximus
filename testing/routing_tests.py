import unittest
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


class RoutingTests(unittest.TestCase):
    def setUp(self):
        self.options = Options()
        self.options.add_argument("--headless")
        self.driver = webdriver.Chrome(chrome_options=self.options)

    def test_get_login_link(self):
        print("Running test_get_login_link testcase")
        driver = self.driver
        driver.get("http://localhost:4200/login")
        time.sleep(1)
        self.assertIn("http://localhost:4200/login", driver.current_url)

    def test_get_email_confirm_success(self):
        print("Running test_get_email_confirm_success testcase")
        driver = self.driver
        driver.get("http://localhost:4200/emailconfirm/success")
        time.sleep(1)
        self.assertIn("http://localhost:4200/emailconfirm/success", driver.current_url)

    def test_email_confirm_success_button(self):
        print("Running test_email_confirm_success_button")
        driver = self.driver
        driver.get("http://localhost:4200/emailconfirm/success")
        time.sleep(1)
        driver.find_element_by_xpath("/html/body/app-root/app-success/div/p-button/button/span").click()
        time.sleep(1)
        self.assertIn("http://localhost:4200/login", driver.current_url)

    def test_get_email_confirm_failed(self):
        print("Running test_get_email_confirm_failed testcase")
        driver = self.driver
        driver.get("http://localhost:4200/emailconfirm/failed")
        time.sleep(1)
        self.assertIn("http://localhost:4200/emailconfirm/failed", driver.current_url)

    def test_email_confirm_failed_button(self):
        print("Running test_email_confirm_failed_button testcase")
        driver = self.driver
        driver.get("http://localhost:4200/emailconfirm/failed")
        time.sleep(1)
        driver.find_element_by_xpath("/html/body/app-root/app-failed/div/p-button/button").click()
        time.sleep(1)
        self.assertIn("http://localhost:4200", driver.current_url)

    def test_get_email_confirm_wrongtoken(self):
        print("Running test_get_email_confirm_wrongtoken testcase")
        driver = self.driver
        driver.get("http://localhost:4200/emailconfirm/wrongtoken")
        time.sleep(1)
        self.assertIn("http://localhost:4200/emailconfirm/wrongtoken", driver.current_url)

    def test_email_confirm_wrongtoken_button(self):
        print("Running test_email_confirm_wrongtoken_button testcase")
        driver = self.driver
        driver.get("http://localhost:4200/emailconfirm/wrongtoken")
        time.sleep(1)
        driver.find_element_by_xpath("/html/body/app-root/app-wrongtoken/div/p-button/button").click()
        time.sleep(1)
        self.assertIn("http://localhost:4200", driver.current_url)

    def test_page_not_found_link(self):
        driver = self.driver
        driver.get("http://localhost:4200/ilyenlinkugysincsen")
        time.sleep(1)
        is_find = False
        try:
            driver.find_element_by_xpath("/html/body/app-root/app-page-not-found/div/div")
        except Exception as e:
            print(e)
        finally:
            is_find = True
            self.assertEqual(True, is_find)
            

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()