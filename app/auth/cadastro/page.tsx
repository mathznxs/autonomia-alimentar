'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function CadastroPage() {
  const router = useRouter()
  
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('As senhas nao coincidem.')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        if (error.message.includes('already registered')) {
          setError('Este email ja esta cadastrado. Tente fazer login.')
        } else {
          setError(error.message)
        }
        return
      }

      router.push('/auth/cadastro-sucesso')
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

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
            <CardTitle className="font-serif text-2xl text-forest">Criar sua conta</CardTitle>
            <CardDescription className="text-olive">
              Preencha seus dados para comecar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-forest">Nome completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 border-gold/30 bg-white text-base focus:border-forest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-forest">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-gold/30 bg-white text-base focus:border-forest"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-forest">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-gold/30 bg-white pr-12 text-base focus:border-forest"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-olive hover:text-forest"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-forest">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repita sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 border-gold/30 bg-white text-base focus:border-forest"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-forest text-lg text-cream hover:bg-forest/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  'Criar conta'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-olive">
                Ja tem uma conta?{' '}
                <Link href="/auth/login" className="font-medium text-forest hover:underline">
                  Fazer login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-olive">
          <Link href="/" className="hover:text-forest">
            Voltar para a pagina inicial
          </Link>
        </p>
      </div>
    </div>
  )
}
