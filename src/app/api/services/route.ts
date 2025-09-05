import { NextRequest, NextResponse } from 'next/server'
import { services } from '../../../data'

export async function GET(request: NextRequest) {
  try {
    console.log('API', services)
    
    return NextResponse.json({ services })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}