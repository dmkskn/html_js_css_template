import re
import sys


MODULE_REGEX = r"^[a-zA-Z][_a-zA-Z0-9]+$"
slug = "{{ cookiecutter.slug }}"

if not re.match(MODULE_REGEX, slug):
    print(f"ERROR: {slug} is not a valid name! 🧐")
    sys.exit(1)
