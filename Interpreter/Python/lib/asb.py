"""
import pytz

from apscheduler.schedulers.blocking import BlockingScheduler
import time


timez = pytz.timezone('Asia/Shanghai')
scheduler = BlockingScheduler(timezone=timez)
 
def job1():
    print("job1")

scheduler.add_job(job1, 'interval', seconds=3)

scheduler.start()
"""

print(__path__)
