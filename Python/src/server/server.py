#

import time
import zmq
import json

class Server():

    def __init__(self):
        pass

    def start(self):
        print("Starting Server...")

        #
        #   Hello World server in Python
        #   Binds REP socket to tcp://*:5555
        #   Expects b"Hello" from client, replies with b"World"
        #

        context = zmq.Context()
        socket = context.socket(zmq.REP)
        socket.bind("tcp://*:5555")
        print("Server Running...")

        while True:
            #  Wait for next request from client
            message = socket.recv().decode("utf-8")
            json = json.loads(message)
            prettyPrint_json = json.dumps(json, sort_keys=True, indent=4, separators=(',', ': '))
            print(prettyPrint_json)
            #print(f"Received request: {pretty_json}")

            #  Do some 'work'.
            #  Try reducing sleep time to 0.01 to see how blazingly fast it communicates
            #  In the real world usage, you just need to replace time.sleep() with
            #  whatever work you want python to do, maybe a machine learning task?
            time.sleep(1)

            #  Send reply back to client
            #  In the real world usage, after you finish your work, send your output here
            # the 'b' converts the string to bytes - because we are sending them
            socket.send(b"World")

    def close(self):
        print("Closing server...")
