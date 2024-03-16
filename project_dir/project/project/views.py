from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def page1(request):
    return render(request, 'project/page1.html')

def page2(request):
    return render(request, 'project/page2.html')

@login_required
def page3(request):
    return render(request, 'project/page3.html')