from pip._vendor import requests
from bs4 import BeautifulSoup

text = requests.get(
    "https://store.steampowered.com/search/?term=rust&supportedlang=english&ndl=1").text
soup = BeautifulSoup(text, features="html.parser")
page_item = soup.find('div', class_='responsive_search_name_combined')
name = page_item.find('span', class_='title').text
price = page_item.find(
    'div', class_='col search_price responsive_secondrow').text.replace(' ', '')

print("Sample Webscraping Example")
print("Game: " + name, "\n")
print("Price:", price)
