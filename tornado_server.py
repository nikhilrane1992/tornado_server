import tornado.ioloop
import tornado.web
import tornado.websocket

PORT = 8888

from globalVariables import clientTypesAndClients

class GetJsonHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True

	def open(self, *args):
		clientTypesAndClients["jsonTestClient"].append(self)
		print "CONNECTION AT NEW ORDERS TABLE WEBSOCKET SERVER IS OPEN!!!!"

	def on_message(self, message):
		print "NEW ORDERS TABLE SERVER RECEIVED A MESSAGE!!!!!!!!!!!!!!!!! : %s" % (message)

	def json_test(self, message):
		self.write_message(message)

	def on_close(self):
		clientTypesAndClients["jsonTestClient"].remove(self)

class JsonTestHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def post(self):
        data = self.request.body

        if data != None:
            print "DATA RECEIVED BY ORDER PLACED HANDLER"
            print str(data)
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

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r'/tornado/webSocket/json_test/', JsonTestHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(PORT)
    print "Listening port-->", PORT
    tornado.ioloop.IOLoop.current().start()