.PHONY: all publish

all: src/index.html

src/index.html: bin/generate_markup.py
	python bin/generate_markup.py > $@

publish:
	ghp-import -n -p ./src/
