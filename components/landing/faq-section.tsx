import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Como funciona a entrega das refeicoes?',
    answer: 'As refeicoes sao entregues semanalmente, congeladas e embaladas individualmente. Voce recebe em casa, no dia e horario agendado. Basta aquecer no microondas ou forno e esta pronto para consumir.',
  },
  {
    question: 'As refeicoes sao adequadas para diabeticos?',
    answer: 'Sim! Temos o Kit Controle Diabetes especialmente desenvolvido por nutricionistas para pessoas com diabetes. Todas as refeicoes deste kit tem baixo indice glicemico e sao livres de acucar adicionado.',
  },
  {
    question: 'Posso personalizar meu cardapio?',
    answer: 'Sim, voce pode escolher refeicoes individuais do nosso cardapio ou optar por um dos nossos kits pre-montados. Tambem e possivel informar restricoes alimentares e alergias para adaptarmos seu pedido.',
  },
  {
    question: 'Quanto tempo as refeicoes duram congeladas?',
    answer: 'Nossas refeicoes mantem a qualidade por ate 30 dias quando armazenadas corretamente no congelador. Recomendamos consumir dentro de 7 dias apos descongelar na geladeira.',
  },
  {
    question: 'Qual a area de entrega?',
    answer: 'Atualmente atendemos a Grande Sao Paulo e algumas cidades do interior. Estamos em expansao! Entre em contato para verificar se atendemos sua regiao.',
  },
  {
    question: 'Posso cancelar ou pausar minha assinatura?',
    answer: 'Sim, voce tem total flexibilidade. Pode pausar, cancelar ou alterar seu plano a qualquer momento pelo nosso site ou entrando em contato com nossa equipe. Nao ha fidelidade ou multa.',
  },
  {
    question: 'As refeicoes contem conservantes?',
    answer: 'Nao! Todas as nossas refeicoes sao preparadas com ingredientes frescos e naturais, sem conservantes artificiais. O congelamento e nosso metodo de conservacao, mantendo os nutrientes e o sabor.',
  },
  {
    question: 'Como posso entrar em contato em caso de duvidas?',
    answer: 'Voce pode nos contatar pelo WhatsApp (11) 99999-9999, email contato@autonomiaalimentar.com.br ou pelo formulario de contato em nosso site. Nossa equipe responde em ate 24 horas.',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">Duvidas?</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">
              Perguntas Frequentes
            </h2>
            <p className="mt-4 text-lg text-olive">
              Encontre respostas para as duvidas mais comuns sobre nossos servicos.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gold/20">
                <AccordionTrigger className="text-left font-medium text-forest hover:text-olive text-lg py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-olive leading-relaxed text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
