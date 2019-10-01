import subprocess as sp

end = """

Done. What to do next?

- cd {{ cookiecutter.slug }}
- git init
- npm install
- npm run build

"""

if __name__ == "__main__":
    print(end)
