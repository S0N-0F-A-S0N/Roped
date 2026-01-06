
from playwright.sync_api import sync_playwright
import os

def run():
    # Get the current directory to form the file path
    cwd = os.getcwd()
    file_path = f'file://{cwd}/index.html'

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Log console messages
        page.on('console', lambda msg: print(f'Console: {msg.text}'))
        page.on('pageerror', lambda err: print(f'Error: {err}'))

        print(f'Navigating to {file_path}')
        page.goto(file_path)

        # Wait for a bit to let the scene render
        page.wait_for_timeout(3000)

        # Take a screenshot
        screenshot_path = 'verification/verification.png'
        page.screenshot(path=screenshot_path)
        print(f'Screenshot saved to {screenshot_path}')

        browser.close()

if __name__ == '__main__':
    run()
