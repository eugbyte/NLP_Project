#!C:\Users\eugen\Codes\NLP_Project\NLP\fastApi\venv\Scripts\python.exe
# EASY-INSTALL-ENTRY-SCRIPT: 'xlwings==0.17.1','console_scripts','xlwings'
__requires__ = 'xlwings==0.17.1'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('xlwings==0.17.1', 'console_scripts', 'xlwings')()
    )
