import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import cv2
import os
import pytesseract
import pandas as pd
pd.set_option('display.max_rows', None)
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\vzago\Tesseract-OCR\tesseract.exe'

path_vk = 'F:/DATASETS/hacks-ai-2023/vk/images/'

def walk_folder(image_folder):
    filelist = []
    df = pd.DataFrame(columns=['Количество подписчиков', 'image'])
    for address, dirs, files in os.walk(image_folder):
        for name in files:
            filelist.append(os.path.join(address, name))
    for file in filelist:
        print(file)
        text = ""
        try:
            img = cv2.imread(file)
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            text = pytesseract.image_to_string(img_rgb, lang='rus')
        except:
            sub = "Ошибка"
        if text.lower().find('подписчики') != -1:
            index = text.lower().find('подписчики')
            if len(text[index + 11:].split('\n')[0].split(' ')) >1:
                if text[index + 11:].split('\n')[0].split(' ')[1].isdigit():
                    subs = text[index + 11:].split('\n')[0].split(' ')[0] + text[index + 11:].split('\n')[0].split(' ')[1]
                else:
                    subs = text[index + 11:].split('\n')[0].split(' ')[0]
            else:
                subs = text[index + 11:].split('\n')[0].split(' ')[0]
        elif text.lower().find('подписчика') != -1:
            index = text.lower().find('подписчика')
            subs = text[:index-1].split('\n')[-1].split(' ')[-1]
        elif text.lower().find('подписчиков') != -1:
            index = text.lower().find('подписчиков')
            if text[:index - 1].split('\n')[-1].split(' ')[-1].find('друзей') != -1:
                try:
                    if text[:index - 1].lower().split('\n')[-2].split(' ')[0][-1].find('к') != -1:
                        subs = float(text[:index - 1].split('\n')[-2].split(' ')[-4][:-1]) * 1000 + float(text[:index - 1].split('\n')[-2].split(' ')[-3])
                    else:
                        subs = int(text[:index - 1].split('\n')[-2].split(' ')[0]) + int(text[:index - 1].split('\n')[-2].split(' ')[1])
                except:
                    subs = "Ошибка"
            elif text[:index - 1].split('\n')[-1].split(' ')[-1].find('оценок') != -1:
                if text[:index - 1].lower().split('\n')[-3].split(' ')[-2][-1].find('к') != -1:
                    try:
                        subs = float(text[:index - 1].split('\n')[-2].split(' ')[-2][:-1]) * 1000
                    except:
                        subs = "Ошибка"
                else:
                    subs = text[:index - 1].split('\n')[-3].split(' ')[-2]
            else:
                if text[:index - 1].split('\n')[-1].lower().split(' ')[-1].find("к") != -1:
                    try:
                        subs = float(text[:index - 1].split('\n')[-1].split(' ')[-1][:-1].replace(',', '.')) * 1000
                    except:
                        subs = "Ошибка"
                else:
                    subs = text[:index - 1].split('\n')[-1].split(' ')[-1]
        elif text.lower().find('подписчик') != -1:
            index = text.lower().find('подписчик')
            if text[:index - 1].split('\n')[-1].split(' ')[-1].find('друзей') != -1:
                if text[:index - 1].split('\n')[-2].split(' ')[0][-1].find('к') !=-1:
                    subs = float(text[:index - 1].split('\n')[-2].split(' ')[0][:-1]) *1000 + float(text[:index - 1].split('\n')[-2].split(' ')[1])
                else:
                    subs = text[:index - 1].split('\n')[-2].split(' ')[0]
            else:
                subs = text[:index - 1].split('\n')[-1].split(' ')[-1]
        elif text.lower().find('участники') != -1:
            index = text.lower().find('участники')
            subs = text[index + 10:].split('\n')[0]
        elif text.lower().find('участников') != -1:
            index = text.lower().find('участников')
            if text[:index -1].split('\n')[-1].lower().split(' ')[-1].find("к") != -1:
                subs = float(text[:index - 1].split('\n')[-1].split(' ')[-1][:-1].replace(',', '.')) * 1000
            else:
                subs = text[:index -1].split('\n')[-1].split(' ')[-1]
        elif text.lower().find('участник') != -1:
            index = text.lower().find('участник')
            subs = text[:index].split('\n')[-1].split(' ')[-1]
        elif text.lower().find('друзей') != -1:
            index = text.lower().find('друзей')
            if text[:index -1].split('\n')[-2].split(' ')[0].find('к') != -1:
                subs = float(text[:index - 1].split('\n')[-2].split(' ')[0]) * 1000
            else:
                if not text[:index - 1].split('\n')[-2].split(' ')[0].isalnum():
                    subs = text[:index - 1].split('\n')[-1].split(' ')[0]
                else:
                    subs = text[:index - 1].split('\n')[-2].split(' ')[0]
        elif text.lower().find('друга') != -1:
            index = text.lower().find('друга')
            subs = text[:index - 1].split('\n')[-1].split(' ')[-1]
        elif text.lower().rfind('друзья') != -1:
            index = text.lower().rfind('друзья')
            subs = text[index+7:].split('\n')[0].split(' ')[0]
        else:
            subs = "Ошибка"
        df2 = pd.DataFrame({'Количество подписчиков': subs, 'image': file.split('/')[-1]}, index=[0])
        pd.options.mode.chained_assignment = None
        df = pd.concat([df, df2], ignore_index=True)
        # print(df)
        # print(df[df['Количество подписчиков'].eq("Ошибка")].count())
    return df.to_excel("../back_collect_data/vk_data.xlsx")