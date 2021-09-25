from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer

from frontend.MessagesDataSet import MessagesDataSet


class FrontEndConsumer(JsonWebsocketConsumer):
    # Create Dataset, accept client, and send first set of pages
    def connect(self):
        async_to_sync(self.channel_layer.group_add)('live-connections', self.channel_name)
        self.dataset = MessagesDataSet()
        first_pages = self.dataset.get_first_page_for_channels()
        self.accept()
        self.send_json(first_pages)

    # on request for new page, send next page
    def receive(self, text_data=None, bytes_data=None, **kwargs):
        self.send_json(self.dataset.get_next_page(text_data))

    # on new message in DB, update self and client
    def incoming_message(self, event):
        book = self.dataset.update_book(event["channel_name"])
        self.send_json(book)
        print(book)

    # on new channel in DB, update self since no messages for channel yet
    def channel_added(self, event):
        self.dataset.update_book(event["channel_name"])
