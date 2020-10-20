from server.server import Server

if __name__ == '__main__':
      # execute only if run as a script
      server = Server()
      server.start()
      server.close()
