import sys
import shlex
import argparse
import posixpath
import collections

import boto3


# Command line arguments ///////////////////////////////////////////////////////
parser = argparse.ArgumentParser()
parser.add_argument('-b', '--bucket', required=True, help='The S3 Bucket')
parser.add_argument('file', type=argparse.FileType('r'),
                    help='File with redirect rules')


# Globals //////////////////////////////////////////////////////////////////////
ARGS = parser.parse_args()

REDIRECT_RULES = []

RedirectRule = collections.namedtuple(
    'RedirectRule',
    ['key', 'redirect_location'])

def truncleft(width, string):
    if len(string) > width:
        string = '...{}'.format(string[-width+3:])
    return string

def hasextention(path):
    extention = posixpath.splitext(rule.key)[1]
    if not extention:
        return False
    return True


# Do the work //////////////////////////////////////////////////////////////////
with ARGS.file as rules_file:
    for line in rules_file:
        rule_parts = shlex.split(line, comments=True)

        if not rule_parts:
            continue
        if len(rule_parts) != 2:
            print('invalid rule:\n', line)
            sys.exit(1)
        if rule_parts[0].startswith('/'):
            print('Redirect object key cannot start with "/"\n', line)
            sys.exit(1)

        REDIRECT_RULES.append(
            RedirectRule(
                key=rule_parts[0],
                redirect_location=rule_parts[1]))

s3 = boto3.client('s3')

for rule in REDIRECT_RULES:
    if not hasextention(rule.key):
        new_key = posixpath.join(rule.key, 'index.html')
        rule = rule._replace(key=new_key)

    print('{: <38} -> {: <38}'.format(
        truncleft(38, rule.key),
        truncleft(38, rule.redirect_location)))

    s3.put_object(
        Bucket=ARGS.bucket,
        Key=rule.key,
        WebsiteRedirectLocation=rule.redirect_location)
