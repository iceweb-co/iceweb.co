from argparse import ArgumentParser, FileType
from shlex import split as split_like_shell
from boto3 import client as aws_client
from sys import exit
from os import path


parser = ArgumentParser()
parser.add_argument('-b', '--bucket', required=True, help='S3 Bucket')
parser.add_argument('file', type=FileType('r'), help='File with redirect rules')


args = parser.parse_args()
redirect_rules = []
with args.file as rules_file:
    for line in rules_file:
        rule_parts = split_like_shell(line, comments=True)

        if not rule_parts:
            continue
        if len(rule_parts) < 2:
            print('invalid rule:\n', line)
            exit(1)

        rule_from = rule_parts[0]
        rule_to = rule_parts[1]

        if rule_from.startswith('/'):
            print('Redirec object key cannot start with "/"\n', line)
            exit(1)

        rule_from_ext = path.splitext(rule_from)[1]
        if not rule_from_ext:
            rule_from += '/index.html'

        redirect_rules.append({
            'from': rule_from,
            'to': rule_to
        })


s3 = aws_client('s3')
for rule in redirect_rules:
    print(rule)

    s3_response = s3.put_object(
        Bucket=args.bucket,
        Key=rule['from'],
        WebsiteRedirectLocation=rule['to']
    )
