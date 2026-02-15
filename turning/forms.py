from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': 'alfred john',
            'id': 'name'
        })
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'placeholder': 'alfred@example.com',
            'id': 'email'
        })
    )
    phone = forms.CharField(
        max_length=20,
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': '+971 XX XXX XXXX',
            'id': 'phone'
        })
    )
    service = forms.ChoiceField(
        choices=[
            ('', 'Select a service'),
            ('brush-kart', 'Brush Kart Manufacturing'),
            ('hydraulic', 'Hydraulic System Solutions'),
            ('fabrication', 'Industrial Fabrication & Welding'),
            ('maintenance', 'Machine Servicing & Maintenance'),
            ('consultation', 'Technical Consultation'),
            ('other', 'Other'),
        ],
        required=False,
        widget=forms.Select(attrs={'id': 'service'})
    )
    message = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'rows': 6,
            'placeholder': 'Tell us about your project requirements...',
            'id': 'message'
        })
    )