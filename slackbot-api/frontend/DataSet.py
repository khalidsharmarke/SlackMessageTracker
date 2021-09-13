from django.core.paginator import Paginator
from api.models import Channel, Message


class DataSet:
    def __init__(self):
        self.collection = {}
        for channel in Channel.objects.all():
            # if book.count is not 0:
            self.collection[channel.name] = self.get_book(channel)

    def get_book(self, channel):
        return {
            "book": Paginator(Message.objects.filter(channel=channel), 25),
            "current_page": 1
        }

    def update_book(self, channel_name):
        channel = Channel.objects.get(name=channel_name)
        book = self.get_book(channel)
        self.collection[channel_name] = book
        page = self.get_first_page(channel_name)
        return {
            channel_name: page
        }

    def get_first_page(self, channel_name):
        page = self.page_to_list(self.collection[channel_name]["book"], 1)
        self.increment_page(channel_name)
        return page

    def get_first_page_for_channels(self):
        result = {}
        for book in self.collection:
            result[book] = self.get_first_page(book)
            self.increment_page(book)
        return result

    def get_next_page(self, channel):
        page = self.page_to_list(
            self.collection[channel]["book"],
            self.collection[channel]["current_page"])
        self.increment_page(channel)
        return page

    def page_to_list(self, book, page_number, test=None):
        page_as_list = []
        for message in book.get_page(page_number):
            if message is not None:
                page_as_list.append(message.populate())
        return page_as_list

    def increment_page(self, channel):
        self.collection[channel]["current_page"] += 1
