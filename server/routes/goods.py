from bs4 import BeautifulSoup
from helper import main_helper
import random
def getSoup(file,parser):
    bs=BeautifulSoup(file,parser)
    return bs




def getProducts():
    products=[]
    with open('./html_files/goods.html') as html_file:
        soup=getSoup(html_file,'html.parser')
    goods=soup.find_all('div',class_='sg-col-4-of-24 sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col s-widget-spacing-small sg-col-4-of-20 gsx-ies-anchor')
    for pcs in goods:
        product_image =pcs.find('img')['src']
        product_name=pcs.find('span',class_='a-size-base-plus a-color-base a-text-normal')
        price=pcs.find('span',class_='a-price-whole') 
        alt_price=str(random.randint(100,500))
        product_price=price.text if price!=None else alt_price
        product_href=pcs.find('a',class_='a-link-normal s-no-outline')['href']
        # product_suplier=pcs.find('span',class_="a-size-base-plus a-color-base").text
        product={
            'name':main_helper.removeUnwantedSpace(product_name.text),
            'image':product_image,
            'price':product_price,
            'href':product_href,
            # 'supplier':product_suplier
        }
        products.append(product)
    return products

"""
to link to each product link i have to get the href value of the containinga tag of each product and scape teh file with playwrghth in an headless mode or request the page.
i will try to request first because that the simplest approach to get data, but since the page is loaded dynamially i think scrapping might be the best option here
"""