import subprocess
import time
import schedule
import threading

def keep_alive():
    # Run a command to keep the Codespace active in the background
    subprocess.Popen(["bash", "-c", "while true; do sleep 14400; done"])

    while True:
        print("Keeping Codespace alive...")
        time.sleep(30)  # Sleep for 5 minutes

def run_bot():
    try:
        # Start the bot process
        print("Starting the bot...")
        process = subprocess.Popen(['python3', '/workspaces/soull/shadow.py'])
        process.wait()  # Wait for the process to complete
        if process.returncode != 0:
            raise Exception(f"Bot crashed with return code {process.returncode}")
    except Exception as e:
        print(f"Bot crashed with exception: {e}")
        print("Restarting bot in 5 seconds...")
        time.sleep(5)
        run_bot()  # Restart the bot

def schedule_bot():
    while True:
        schedule.run_pending()
        time.sleep(1)

# Schedule the bot to run every 3 hours
schedule.every(3).hours.do(run_bot)

if __name__ == "__main__":
    # Start the keep_alive function in a separate thread
    keep_alive_thread = threading.Thread(target=keep_alive)
    keep_alive_thread.daemon = True
    keep_alive_thread.start()
    
    # Initial run to start the bot immediately
    run_bot()
    
    # Start the schedule loop
    schedule_bot()

