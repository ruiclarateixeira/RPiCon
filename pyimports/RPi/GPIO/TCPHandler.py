""" TCP Handler for GPIO debug output """
import socket


class TCPHandler(object):
    """ TCP Handler """

    def __init__(self, host, port):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        s.listen(1)
        print "[GPIODEBUG] Accepting connection on {}:{}".format(host, port)
        self.conn, addr = s.accept()
        print "[GPIODEBUG] Debug socket connected"

    def send(self, message):
        """ Send message to client """
        if message.endswith("\n"):
            self.conn.sendall(message)
        else:
            self.conn.sendall(message + "\n")
