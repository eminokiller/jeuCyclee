<?php

namespace App\Form;

use App\Entity\Question;
use Doctrine\DBAL\Types\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('libelle')
            ->add('reponses', CollectionType::class, [
                'entry_type' => ReponseType::class,
                'label' =>false,
                'entry_options' => ['label' => true],
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
            ]);


        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Question::class,
        ]);
    }
}
