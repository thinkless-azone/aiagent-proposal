
from fpdf import FPDF
import datetime

class PDF(FPDF):
    def header(self):
        self.set_font('DejaVu', 'B', 20)
        self.cell(0, 10, 'Коммерческое предложение', 0, 1, 'C')
        self.set_font('DejaVu', '', 12)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, 'Локальный ИИ-агент для 1С:Предприятие', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('DejaVu', '', 8)
        self.set_text_color(128)
        self.cell(0, 10, f'AZONE AI // Проектное предложение v15 // Страница {self.page_no()}', 0, 0, 'C')

    def chapter_title(self, title):
        self.set_font('DejaVu', 'B', 14)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, title, 0, 1, 'L')
        self.ln(4)

    def chapter_body(self, body):
        self.set_font('DejaVu', '', 11)
        self.set_text_color(60, 60, 60)
        self.multi_cell(0, 7, body)
        self.ln()

    def add_table(self, header, data, col_widths):
        self.set_font('DejaVu', 'B', 10)
        self.set_fill_color(41, 128, 185)
        self.set_text_color(255)
        
        # Header
        for i, h in enumerate(header):
            self.cell(col_widths[i], 10, h, 1, 0, 'C', 1)
        self.ln()
        
        # Data
        self.set_font('DejaVu', '', 10)
        self.set_text_color(0)
        fill = False
        for row in data:
            self.set_fill_color(240, 240, 240) if fill else self.set_fill_color(255)
            for i, datum in enumerate(row):
                align = 'L' if i == 0 else 'R'
                self.cell(col_widths[i], 10, str(datum), 1, 0, align, fill)
            self.ln()
            fill = not fill
            
    def add_total(self, total_price, col_widths):
        self.set_font('DejaVu', 'B', 10)
        self.cell(sum(col_widths[:-1]), 10, 'ИТОГО:', 1, 0, 'R')
        self.cell(col_widths[-1], 10, f'{total_price:,.0f} ₽'.replace(',', ' '), 1, 0, 'R')
        self.ln()

def create_proposal():
    pdf = PDF()
    
    # Add a Unicode font (DejaVuSans)
    # Assuming the font is available in the system or we download it. 
    # For this environment, we might need to download it first.
    # I'll add a check/download step in the shell command.
    pdf.add_font('DejaVu', '', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', uni=True)
    pdf.add_font('DejaVu', 'B', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', uni=True)
    
    pdf.add_page()
    
    # Project Description
    pdf.chapter_title('Описание решения')
    pdf.chapter_body(
        "Предлагаем рассмотреть внедрение автономной системы искусственного интеллекта для автоматизации "
        "финансово-хозяйственных операций. Решение разворачивается в локальном контуре предприятия, "
        "обеспечивая полную конфиденциальность данных и соответствие требованиям импортозамещения."
    )
    
    # Basic Variant
    pdf.chapter_title('Вариант 1: Базовый (Пилотный запуск)')
    header = ['Наименование', 'Кол-во', 'Цена за ед.', 'Сумма']
    col_widths = [90, 20, 40, 40]
    
    basic_data = [
        ['Сервер Гравитон Н22И (Xeon Silver, 128GB)', '1', '3 800 000 ₽', '3 800 000 ₽'],
        ['Коммутатор Eltex MES2300-24', '1', '120 000 ₽', '120 000 ₽'],
        ['ОС Альт Линукс СПТ', '1', '15 000 ₽', '15 000 ₽'],
        ['СУБД Postgres Pro Enterprise', '1', '450 000 ₽', '450 000 ₽'],
        ['ML Платформа (Базовая)', '1', '1 200 000 ₽', '1 200 000 ₽'],
        ['Внедрение: Этап 1 (Анализ)', '1', '500 000 ₽', '500 000 ₽'],
        ['Внедрение: Этап 2 (Развертывание)', '1', '800 000 ₽', '800 000 ₽'],
        ['Внедрение: Этап 3 (Запуск)', '1', '400 000 ₽', '400 000 ₽'],
    ]
    
    pdf.add_table(header, basic_data, col_widths)
    pdf.add_total(7285000, col_widths)
    pdf.ln(10)
    
    # Optimal Variant
    pdf.add_page()
    pdf.chapter_title('Вариант 2: Оптимальный (High-Load)')
    
    optimal_data = [
        ['Сервер YADRO G4208P G3 (Xeon Gold, 512GB, H100)', '1', '12 500 000 ₽', '12 500 000 ₽'],
        ['Коммутатор Eltex MES2300-24', '1', '120 000 ₽', '120 000 ₽'],
        ['ОС Альт Линукс СПТ', '2', '15 000 ₽', '30 000 ₽'],
        ['СУБД Postgres Pro Enterprise', '1', '450 000 ₽', '450 000 ₽'],
        ['Альт Виртуализация', '2', '45 000 ₽', '90 000 ₽'],
        ['ML Платформа (Enterprise)', '1', '2 500 000 ₽', '2 500 000 ₽'],
        ['Коннекторы данных 1С', '1', '350 000 ₽', '350 000 ₽'],
        ['Модуль: Документооборот (OCR)', '1', '500 000 ₽', '500 000 ₽'],
        ['Модуль: Сметы и Закупки', '1', '750 000 ₽', '750 000 ₽'],
        ['Модуль: Видеоаналитика', '1', '1 200 000 ₽', '1 200 000 ₽'],
        ['Внедрение: Этап 1 (Анализ)', '1', '800 000 ₽', '800 000 ₽'],
        ['Внедрение: Этап 2 (Развертывание)', '1', '1 500 000 ₽', '1 500 000 ₽'],
        ['Внедрение: Этап 3 (Запуск)', '1', '800 000 ₽', '800 000 ₽'],
    ]
    
    pdf.add_table(header, optimal_data, col_widths)
    pdf.add_total(21590000, col_widths)
    pdf.ln(10)
    
    # Terms
    pdf.chapter_title('Условия реализации')
    terms = [
        "1. Цены на оборудование являются ориентировочными и уточняются на момент закупки.",
        "2. Срок действия предложения: 30 календарных дней.",
        "3. Условия оплаты: 50% предоплата, 50% после подписания акта приемки-передачи.",
        "4. Гарантия на работы: 12 месяцев с момента ввода в эксплуатацию."
    ]
    for term in terms:
        pdf.cell(0, 7, term, 0, 1)
        
    pdf.output("commercial_proposal_v15.pdf")

if __name__ == "__main__":
    create_proposal()
