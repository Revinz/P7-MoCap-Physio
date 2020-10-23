from server.server import Server
import json


if __name__ == '__main__':
      # execute only if run as a script

      # test pretty print of json
      your_json = '["foo", {"bar":["baz", null, 1.0, 2]}]'
      pretty_json = json.loads(your_json)
      res = json.dumps(pretty_json, sort_keys=True, indent=4, separators=(',', ': '))
      print(res)

      server = Server()
      server.start()
      server.close()
