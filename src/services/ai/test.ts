import { createAIService } from './index'

async function testAIService() {
  console.log('Testing AI Service...')
  
  // Test mock service
  const mockService = createAIService({
    provider: 'mock'
  })

  try {
    const response = await mockService.generateResponse('Hello, can you help me?')
    console.log('Mock service response:', response)
    
    const status = mockService.getServiceStatus()
    console.log('Mock service status:', status)
    
    console.log('✅ Mock service test passed!')
  } catch (error) {
    console.error('❌ Mock service test failed:', error)
  }

  // Test note analysis
  try {
    const analysis = await mockService.analyzeNote('This is a test note about productivity and time management.')
    console.log('Note analysis:', analysis)
    console.log('✅ Note analysis test passed!')
  } catch (error) {
    console.error('❌ Note analysis test failed:', error)
  }

  // Test text summarization
  try {
    const summary = await mockService.summarizeText('This is a long text that needs to be summarized. It contains multiple ideas and concepts that should be condensed into a brief overview.')
    console.log('Text summary:', summary)
    console.log('✅ Text summarization test passed!')
  } catch (error) {
    console.error('❌ Text summarization test failed:', error)
  }

  console.log('All AI service tests completed!')
}

// Run the test
testAIService()