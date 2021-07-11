FROM snakepacker/python:all as builder

COPY requirements.txt /mnt/
RUN python3.7 -m venv /usr/share/python3/venv \
 && /usr/share/python3/venv/bin/pip install -U pip \
 && /usr/share/python3/venv/bin/pip install -Ur /mnt/requirements.txt

FROM snakepacker/python:3.7 as base

COPY --from=builder /usr/share/python3/venv /usr/share/python3/venv
COPY app /usr/share/python3/app

COPY deploy/entrypoint /entrypoint
ENTRYPOINT ["/entrypoint"]