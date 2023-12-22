import html

TEMPLATE = """
<html>
    <head>
        <title>Hello</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
    <body>
        <div id="text">
            {text}
        </div>
        <script src="falling-words.js"></script>
    </body>
</html>
"""

PARAGRAPHS = [
    """Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed rutrum urna. Suspendisse ornare enim id pellentesque ullamcorper. Suspendisse dui tortor, faucibus in commodo eget, scelerisque at felis. Integer nunc mauris, blandit nec consectetur eu, congue vitae sapien. Praesent mollis interdum ipsum. In a gravida sapien, nec semper nisi. Nulla a vulputate ex. Nam ante sem, commodo vitae accumsan sed, mollis vel nibh. Proin bibendum massa arcu, vel interdum mi congue vitae. Suspendisse at felis diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.""",
    """Vivamus pellentesque luctus metus. Pellentesque nisl turpis, fermentum in pharetra eget, efficitur vitae eros. Mauris cursus, arcu ac dignissim dignissim, urna arcu luctus neque, quis rhoncus odio ex luctus arcu. Curabitur vestibulum sem molestie velit sodales, at mattis odio sagittis. Duis gravida ornare risus ac dapibus. Nunc pharetra porta augue, ut congue nisi eleifend non. Sed accumsan elementum est, sit amet hendrerit enim tincidunt id. Sed dapibus luctus nibh, non cursus dui efficitur sit amet. Aliquam tristique molestie risus vel faucibus. Ut eget lectus elit. Suspendisse neque augue, cursus vel commodo eu, sagittis sodales turpis. Etiam sit amet pulvinar nunc.""",
    """Nunc sed rhoncus lacus. Pellentesque facilisis posuere neque non pharetra. Nulla facilisi. Vivamus sodales ligula quis diam egestas ultrices ac ac nulla. Mauris pulvinar fermentum ligula, a semper est ornare eu. Ut eu dui at quam porttitor bibendum in non velit. Aliquam eget est vel velit fringilla interdum. Ut vel lacinia urna, a laoreet magna. Aenean lacus leo, faucibus in erat vitae, mattis lacinia libero. Mauris maximus metus in sapien mollis, quis fringilla eros bibendum. Vivamus in tincidunt felis. Nam pulvinar fermentum ligula sit amet varius. Praesent iaculis felis a molestie eleifend. Integer faucibus venenatis nibh, a cursus elit accumsan quis.""",
    """Praesent laoreet elementum orci, nec vestibulum libero eleifend non. Fusce feugiat ante at eleifend dignissim. Ut a sagittis eros. Nullam non posuere tortor. Donec volutpat vel diam in condimentum. Mauris ut fermentum metus. Proin non tincidunt sapien. Nullam finibus vitae leo accumsan semper. Donec id iaculis arcu. Donec porta mi sed malesuada ultricies. Vestibulum consequat eget lorem in varius. Praesent et neque a sapien dictum tristique sed a nibh.""",
    """Suspendisse varius mauris quis mattis porttitor. Maecenas gravida malesuada risus, sit amet faucibus tellus pharetra non. Sed ligula dui, blandit sed quam et, imperdiet efficitur diam. Suspendisse lacus ligula, cursus eu fringilla condimentum, convallis non lorem. Vivamus in pulvinar nibh, eget convallis lorem. Nam facilisis dolor nec iaculis hendrerit. Aenean eget varius ex. Vestibulum dignissim diam eget arcu varius, sed ultrices quam laoreet. Donec ultricies iaculis neque non mollis. Phasellus in maximus ante, et rhoncus arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare efficitur sapien nec consequat. In vestibulum, nibh at luctus viverra, lectus eros molestie orci, vitae sodales ligula ligula quis massa. Fusce rhoncus augue vel sollicitudin ullamcorper.""",
]


def split_words(text):
    return text.split()


def generate_paragraph_markup(text):
    return " ".join(_generate_paragraph_markup(text))


def _generate_paragraph_markup(text):
    words = split_words(text)
    for word in words:
        yield f'<span class="word">{html.escape(word)}</span>'


def generate_text_markup(paragraphs):
    return "\n".join(f"<p>{generate_paragraph_markup(para)}</p>" for para in paragraphs)


def generate_markup():
    return TEMPLATE.format(text=generate_text_markup(PARAGRAPHS))


if __name__ == "__main__":
    print(generate_markup())
