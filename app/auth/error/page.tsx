import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest">
              <span className="font-serif text-2xl font-bold text-cream">A</span>
            </div>
            <div className="text-left">
              <span className="font-serif text-2xl font-bold text-forest">Autonomia</span>
              <span className="block text-sm text-olive">Alimentar</span>
            </div>
          </Link>
        </div>

        <Card className="border-gold/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="font-serif text-2xl text-forest">Erro na autenticacao</CardTitle>
            <CardDescription className="text-olive">
              Ocorreu um problema durante o processo de autenticacao.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-olive">
              O link pode ter expirado ou ja foi utilizado. Por favor, tente fazer login novamente ou solicite um novo link de confirmacao.
            </p>

            <div className="space-y-3">
              <Link href="/auth/login">
                <Button className="w-full h-12 bg-forest text-lg text-cream hover:bg-forest/90">
                  Ir para o login
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full h-12 border-forest text-forest hover:bg-forest hover:text-cream">
                  Voltar para a pagina inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
