import tornado.ioloop
import tornado.web
import tornado.websocket
import os
from globalVariables import clientTypesAndClients
import json
from pymongo import MongoClient


dirname = os.path.dirname(__file__)

STATIC_PATH = os.path.join(dirname, 'static')
TEMPLATE_PATH = os.path.join(dirname, 'templates')
PORT = 8888


mongoPort = 27017
client = MongoClient('localhost', mongoPort)
db = client.chat_system


class MainHandler(tornado.websocket.WebSocketHandler):
	def get(self):
		self.render("index.html")

class GetJsonHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True

	def open(self, *args):
		clientTypesAndClients["jsonTestClient"].append(self)
		print "CONNECTION AT NEW ORDERS TABLE WEBSOCKET SERVER IS OPEN!!!!"

	def on_message(self, message):
		print "NEW ORDERS TABLE SERVER RECEIVED A MESSAGE!!!!!!!!!!!!!!!!! : %s" % (message)

	def json_test(self, message):
		print "Message====",message
		self.write_message(message)

	def on_close(self):
		clientTypesAndClients["jsonTestClient"].remove(self)

class JsonTestHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def post(self):
        data = self.request.body

        if data != None:
            print "DATA RECEIVED BY ORDER PLACED HANDLER"
            print data
            data = json.loads(data)
            data.update({"receiver": True, "sender": False})
        else:
            data = {'status':False,'validation':'No data found...'}
            data = json.dumps(data);
            print "DATA NOT RECEIVED"
            print data

        for jsonTestClent in clientTypesAndClients["jsonTestClient"]:
            jsonTestClent.json_test(data);
        self.finish()

    def on_message(self, message):
        print "NEW ORDERS TABLE SERVER RECEIVED A MESSAGE!!!!!!!!!!!!!!!!! : %s" % (message)



class Application(tornado.web.Application):
	def __init__(self):
		handlers = [
			(r"/tornado/webSocket/get_json/", GetJsonHandler),
			(r"/", MainHandler),
			(r'/tornado/webSocket/send_json/', JsonTestHandler),
		]
		settings = {
			"template_path": TEMPLATE_PATH,
			"static_path": STATIC_PATH,
		}
		tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == "__main__":
    app = Application()
    app.listen(PORT)
    print "Listening port-->", PORT
    tornado.ioloop.IOLoop.current().start()