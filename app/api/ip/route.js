export async function GET(request) {
  try {
    // Try to get IP from request headers first
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded?.split(',')[0] || realIp || '127.0.0.1';
    
    // Try multiple IP services in case one fails
    const services = [
      'https://api.ipify.org?format=json',
      'https://httpbin.org/ip',
      'https://ipinfo.io/json'
    ];
    
    for (const service of services) {
      try {
        const res = await fetch(service, { 
          timeout: 5000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; API/1.0)'
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          const ip = data.ip || data.origin || clientIp;
          
          return Response.json({
            success: true,
            data: { ip, service },
            ip: ip
          });
        }
      } catch (serviceError) {
        console.log(`Service ${service} failed:`, serviceError.message);
        continue;
      }
    }
    
    // Fallback to request IP if all services fail
    return Response.json({
      success: true,
      data: { ip: clientIp, service: 'fallback' },
      ip: clientIp
    });
    
  } catch (error) {
    console.error('IP API Error:', error);
    return Response.json(
      { 
        success: false, 
        error: error.message,
        ip: '127.0.0.1' // fallback IP
      }, 
      { status: 200 } // Return 200 with fallback instead of 500
    );
  }
}
